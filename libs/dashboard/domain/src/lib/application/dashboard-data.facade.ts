import { BehaviorSubject, Observable, filter, take } from 'rxjs';

import { ApiState, ApiStateManager } from '@trade-alerts/shared/data-access';
import { isNonNull } from '@trade-alerts/shared/util-common';

import { AlertInfo, DashboardData } from '../entities/dashboard-data.model';
import { getAlertId } from '../entities/dashboard-data.util';
import { DashboardDataService } from '../infrastructure/dashboard-data.service';

/**
 * Facade to interface between containers / context providers and http services. Stores
 * results as observable streams through BevahiorSubjects.
 */
export interface IDashboardDataFacade {
  dashData$: Observable<DashboardData>;
  dashDataState$: Observable<ApiState>;
  dashData: DashboardData | null;
  loadDashData: (params: URLSearchParams) => void;
  updateAlert: (alert: AlertInfo) => void;
}

class DashboardDataFacade implements IDashboardDataFacade {
  constructor(private dataService: DashboardDataService) {}

  // Separate private subjects to handle data and current API states.
  private dashDataSubject: BehaviorSubject<DashboardData | null> = new BehaviorSubject(
    null
  );
  private dashDataStateSubject: BehaviorSubject<ApiState> = new BehaviorSubject(
    ApiStateManager.onInit()
  );

  // Exposed as readonly observables with null values filtered out.
  dashData$: Observable<DashboardData> = this.dashDataSubject
    .asObservable()
    .pipe(filter(isNonNull));
  dashDataState$: Observable<ApiState> = this.dashDataStateSubject
    .asObservable()
    .pipe(filter(isNonNull));

  get dashData(): DashboardData | null {
    return this.dashDataSubject.value;
  }

  loadDashData(params: URLSearchParams) {
    this.dashDataStateSubject.next(ApiStateManager.onPending());
    this.dataService
      .getDashData(params)
      .pipe(take(1))
      .subscribe({
        next: (data: DashboardData) => {
          this.dashDataSubject.next(data);
          this.dashDataStateSubject.next(ApiStateManager.onCompleted());
        },
        error: (error: string) => {
          this.dashDataStateSubject.next(ApiStateManager.onFailed(error));
        },
      });
  }

  updateAlert(alert: AlertInfo) {
    if (!this.dashData?.alerts) {
      return;
    }
    const alerts: AlertInfo[] = this.dashData.alerts.map((item: AlertInfo) =>
      getAlertId(item) === getAlertId(alert) ? alert : item
    );

    this.dashDataSubject.next({ ...this.dashData, alerts });
  }
}

export const dashboardDataFacade: DashboardDataFacade = new DashboardDataFacade(
  new DashboardDataService()
);
