import { BehaviorSubject, Observable, filter, take } from 'rxjs';

import {
  ApiRequestType,
  ApiState,
  ApiStateManager,
} from '@trade-alerts/shared/data-access';
import { isNonNull } from '@trade-alerts/shared/util-common';

import {
  AlertInfo,
  AlertUpdateParams,
  AlertUpdateResponse,
  DashboardData,
} from '../entities/dashboard-data.model';
import { getAlertId } from '../entities/dashboard-data.util';
import { DashboardDataService } from '../infrastructure/dashboard-data.service';
import { IDashboardDataFacade, dashboardDataFacade } from './dashboard-data.facade';

/**
 * Facade to interface between containers / context providers and http services. Stores
 * results as observable streams through BevahiorSubjects.
 */

class AlertManagerFacade {
  constructor(
    private dataService: DashboardDataService,
    private dashboardDataFacade: IDashboardDataFacade
  ) {}

  // Private subject to handle current API states.
  private alertUpdateStateSubject: BehaviorSubject<ApiState> = new BehaviorSubject(
    ApiStateManager.onInit()
  );

  // Exposed as readonly observables with null values filtered out.
  alertUpdateState$: Observable<ApiState> = this.alertUpdateStateSubject
    .asObservable()
    .pipe(filter(isNonNull));

  updateAlert(id: number, params: AlertUpdateParams) {
    const requestType: ApiRequestType = ApiRequestType.Update;
    this.alertUpdateStateSubject.next(ApiStateManager.onPending(requestType));
    this.dataService
      .updateAlert(id, params)
      .pipe(take(1))
      .subscribe({
        next: (response: AlertUpdateResponse) => {
          this.updateDashboardDataWithAlertParams(id, params);
          this.alertUpdateStateSubject.next(ApiStateManager.onCompleted(requestType));
        },
        error: (error: string) => {
          this.alertUpdateStateSubject.next(ApiStateManager.onFailed(error, requestType));
        },
      });
  }

  private updateDashboardDataWithAlertParams(id: number, params: AlertUpdateParams) {
    const data: DashboardData | null = this.dashboardDataFacade.dashData;
    if (!data?.alerts) {
      return;
    }

    const alert: AlertInfo | undefined = data.alerts.find(
      (item: AlertInfo) => getAlertId(item) === id
    );
    if (alert == null) {
      return;
    }
    const { status } = params;
    this.dashboardDataFacade.updateAlert({ ...alert, status });
  }
}

export const alertManagerFacade: AlertManagerFacade = new AlertManagerFacade(
  new DashboardDataService(),
  dashboardDataFacade
);
