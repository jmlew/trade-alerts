import { BehaviorSubject, Observable, filter } from 'rxjs';

import {
  ApiRequestType,
  ApiState,
  ApiStateManager,
} from '@trade-alerts/shared/data-access';
import { isNonNull } from '@trade-alerts/shared/util-common';

import {
  AlertUpdateParams,
  AlertUpdateResponse,
  DashboardData,
} from '../entities/dashboard-data.model';
import { DataFilters } from '../entities/data-filters.model';
import { getSearchParamsFromDataFilters } from '../entities/data-filters.util';
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

  loadDashData(filters: DataFilters) {
    const requestType: ApiRequestType = ApiRequestType.Read;
    const params: URLSearchParams = getSearchParamsFromDataFilters(filters);

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
  // Send update request and merge payload with current dashboard data, storing the rvious
  // value to be reverted on error.
  updateAlert(id: number, params: AlertUpdateParams) {
    const requestType: ApiRequestType = ApiRequestType.Update;
    this.alertUpdateStateSubject.next(ApiStateManager.onPending(requestType));
    this.dataService.updateAlert(id, params).subscribe({
      next: (response: AlertUpdateResponse) => {
        // TODO: Merge the alerts data with the response and update the status.
        // this.dashDataSubject.next(data);
        this.alertUpdateStateSubject.next(ApiStateManager.onCompleted(requestType));
      },
      error: (error: string) => {
        this.alertUpdateStateSubject.next(ApiStateManager.onFailed(error, requestType));
      },
    });
  }
}

export const dashboardDataFacade: DashboardDataFacade = new DashboardDataFacade(
  new DashboardDataService()
);
