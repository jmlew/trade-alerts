import { BehaviorSubject, Observable, filter, map, take } from 'rxjs';

import {
  AlertInfo,
  dashAlerts$,
  updateDashDataWithAlert,
} from '@trade-alerts/dashboard/api';
import { ApiState, ApiStateManager } from '@trade-alerts/shared/data-access';
import { isNonNull } from '@trade-alerts/shared/util-common';

import {
  Alert,
  AlertUpdateParams,
  AlertUpdateResponse,
} from '../entities/alert-manager-data.model';
import { AlertManagerDataService } from '../infrastructure/alert-manager-data.service';

/**
 * Facade to interface between containers / context providers and http services. Converts
 * results to observable streams and acts as a reactive state management store.
 */

class AlertManagerFacade {
  constructor(private dataService: AlertManagerDataService) {}

  // Private subject to handle current API states.
  private alertUpdateStateSubject: BehaviorSubject<ApiState> = new BehaviorSubject(
    ApiStateManager.onInit()
  );
  private alertIdSubject: BehaviorSubject<number | null> = new BehaviorSubject(null);

  // Exposed as readonly observables.
  alertUpdateState$: Observable<ApiState> = this.alertUpdateStateSubject
    .asObservable()
    .pipe(filter(isNonNull));
  alertId$: Observable<number | null> = this.alertIdSubject.asObservable();
  // Accessing dashboard state through dedicated domain API.
  // TODO: Create dedicated domain APIs.
  alerts$: Observable<Alert[]> = dashAlerts$.pipe(
    map((alerts: AlertInfo[]) =>
      alerts.map((alert: AlertInfo) => {
        const { alertID, status, cif, rmId } = alert;
        return { alertID, status, cif, rmId };
      })
    )
  );

  setAlertId(id: number) {
    this.alertIdSubject.next(id);
  }

  updateAlert(id: number, params: AlertUpdateParams) {
    this.alertUpdateStateSubject.next(ApiStateManager.onPending());
    this.dataService
      .updateAlert(id, params)
      .pipe(take(1))
      .subscribe({
        next: (response: AlertUpdateResponse) => {
          this.updateDashboardDataWithAlertParams(id, params);
          this.alertUpdateStateSubject.next(ApiStateManager.onCompleted());
        },
        error: (error: string) => {
          this.alertUpdateStateSubject.next(ApiStateManager.onFailed(error));
        },
      });
  }

  /**
   * Updates the alert in the dashboard alerts collection which is managed through the
   * dashboard facade.
   */
  private updateDashboardDataWithAlertParams(id: number, params: AlertUpdateParams) {
    const changes: Partial<AlertInfo> = { status: params.status };
    updateDashDataWithAlert(id, changes);
  }
}

export const alertManagerFacade: AlertManagerFacade = new AlertManagerFacade(
  new AlertManagerDataService()
);
