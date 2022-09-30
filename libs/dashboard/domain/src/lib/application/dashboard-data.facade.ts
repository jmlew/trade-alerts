import { BehaviorSubject, Observable, filter } from 'rxjs';

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
import { mergeAlertUpdates } from '../entities/dashboard-data.util';
import { DashboardDataService } from '../infrastructure/dashboard-data.service';

/**
 * Facade to interface between containers / context providers and http services. Stores
 * results as observable streams through BevahiorSubjects.
 */

class DashboardDataFacade {
  constructor(private dataService: DashboardDataService) {}

  // Separate private subjects to handle data and current API states.
  private dashDataSubject: BehaviorSubject<DashboardData | null> = new BehaviorSubject(
    null
  );
  private dashDataStateSubject: BehaviorSubject<ApiState> = new BehaviorSubject(
    ApiStateManager.onInit()
  );
  private alertUpdateStateSubject: BehaviorSubject<ApiState> = new BehaviorSubject(
    ApiStateManager.onInit()
  );

  // Exposed as readonly observables with null values filtered out.
  dashData$: Observable<DashboardData> = this.dashDataSubject
    .asObservable()
    .pipe(filter(isNonNull));
  dashDataState$: Observable<ApiState> = this.dashDataStateSubject
    .asObservable()
    .pipe(filter(isNonNull));
  alertUpdateState$: Observable<ApiState> = this.alertUpdateStateSubject
    .asObservable()
    .pipe(filter(isNonNull));

  loadDashData(params: URLSearchParams) {
    const requestType: ApiRequestType = ApiRequestType.Read;

    this.dashDataStateSubject.next(ApiStateManager.onPending(requestType));
    this.dataService.getDashData(params).subscribe({
      next: (data: DashboardData) => {
        this.dashDataSubject.next(data);
        this.dashDataStateSubject.next(ApiStateManager.onCompleted(requestType));
      },
      error: (error: string) => {
        this.dashDataStateSubject.next(ApiStateManager.onFailed(error, requestType));
      },
    });
  }

  updateAlert(id: number, params: AlertUpdateParams) {
    const requestType: ApiRequestType = ApiRequestType.Update;
    this.alertUpdateStateSubject.next(ApiStateManager.onPending(requestType));
    this.dataService.updateAlert(id, params).subscribe({
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
    const data: DashboardData | null = this.dashDataSubject.value;
    if (data == null) {
      return;
    }
    const alerts: AlertInfo[] | null = data.alerts
      ? mergeAlertUpdates(data.alerts, id, params)
      : null;
    if (alerts) {
      this.dashDataSubject.next({ ...data, alerts });
    }
  }
}

export const dashboardDataFacade: DashboardDataFacade = new DashboardDataFacade(
  new DashboardDataService()
);
