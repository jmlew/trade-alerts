import { BehaviorSubject, Observable, filter, map, take } from 'rxjs';

import { ApiState, ApiStateManager } from '@trade-alerts/shared/data-access';
import {
  Entity,
  isNonNull,
  selectAllFromEntities,
} from '@trade-alerts/shared/util-common';

import {
  AlertInfo,
  AlertUpdateParams,
  AlertUpdateResponse,
  DashboardData,
} from '../entities/dashboard-data.model';
import { AlertManagerDataService } from '../infrastructure/alert-manager-data.service';
import { IDashboardDataFacade, dashboardDataFacade } from './dashboard-data.facade';

/**
 * Facade to interface between containers / context providers and http services. Converts
 * results to observable streams and acts as a reactive state management store.
 */

class AlertManagerFacade {
  constructor(
    private dataService: AlertManagerDataService,
    private dashboardDataFacade: IDashboardDataFacade
  ) {}

  // Private subject to handle current API states.
  private alertUpdateStateSubject: BehaviorSubject<ApiState> = new BehaviorSubject(
    ApiStateManager.onInit()
  );
  private alertIdSubject: BehaviorSubject<number | null> = new BehaviorSubject(null);

  // Exposed as readonly observables with null values filtered out.
  alerts$: Observable<AlertInfo[]> = this.dashboardDataFacade.dashData$.pipe(
    map((data: DashboardData) => data.alerts),
    map((alerts: Entity<AlertInfo>) => selectAllFromEntities<AlertInfo, number>(alerts))
  );
  alertUpdateState$: Observable<ApiState> = this.alertUpdateStateSubject
    .asObservable()
    .pipe(filter(isNonNull));
  alertId$: Observable<number | null> = this.alertIdSubject.asObservable();

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
    this.dashboardDataFacade.updateDashDataWithAlert(id, changes);
  }
}

export const alertManagerFacade: AlertManagerFacade = new AlertManagerFacade(
  new AlertManagerDataService(),
  dashboardDataFacade
);
