import { BehaviorSubject, Observable, filter } from 'rxjs';

import { ApiRequestType, ApiState, ApiStateManager } from '@kdb-dash/shared/data-access';
import { isNonNull } from '@kdb-dash/shared/util-common';

import { DashboardData } from '../entities/dashboard-data.model';
import { DataFilters } from '../entities/data-filters.model';
import { DashboardDataService } from '../infrastructure/dashboard-data.service';

/**
 * Facade to interface between containers / context providers and http services. Stores
 * results as observable streams through BevahiorSubjects.
 */

class DashboardDataFacade {
  constructor(private dashboardDataService: DashboardDataService) {}

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

  loadDashData(filters: DataFilters) {
    const requestType: ApiRequestType = ApiRequestType.Read;
    this.dashDataStateSubject.next(ApiStateManager.onPending(requestType));
    this.dashboardDataService.getDashData(filters).subscribe({
      next: (data: DashboardData) => {
        this.dashDataSubject.next(data);
        this.dashDataStateSubject.next(ApiStateManager.onCompleted(requestType));
      },
      error: (error: string) => {
        this.dashDataStateSubject.next(ApiStateManager.onFailed(error, requestType));
      },
    });
  }
}

export const dashboardDataFacade: DashboardDataFacade = new DashboardDataFacade(
  new DashboardDataService()
);
