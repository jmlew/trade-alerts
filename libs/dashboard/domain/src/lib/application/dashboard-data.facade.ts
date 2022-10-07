import { BehaviorSubject, Observable, filter, map, take } from 'rxjs';

import { ApiState, ApiStateManager } from '@trade-alerts/shared/data-access';
import {
  EntitiesService,
  Entity,
  isNonNull,
  selectAllFromEntities,
} from '@trade-alerts/shared/util-common';

import { AlertInfoField } from '../entities/dashboard-data-fields.enum';
import {
  AlertInfo,
  DashboardApiData,
  DashboardData,
} from '../entities/dashboard-data.model';
import { DashboardDataService } from '../infrastructure/dashboard-data.service';

/**
 * Facade to interface between containers / context providers and http services. Stores
 * results as observable streams through BevahiorSubjects.
 */
export interface IDashboardDataFacade {
  dashData$: Observable<DashboardData>;
  dashAlerts$: Observable<AlertInfo[]>;
  dashDataState$: Observable<ApiState>;
  dashData: DashboardData | null;
  loadDashData: (params: URLSearchParams) => void;
  updateDashDataWithAlert: (id: number, changes: Partial<AlertInfo>) => void;
}

class DashboardDataFacade implements IDashboardDataFacade {
  private alertsEntitiesService: EntitiesService<AlertInfo, number>;

  constructor(private dataService: DashboardDataService) {
    this.alertsEntitiesService = new EntitiesService<AlertInfo, number>(
      AlertInfoField.AlertId
    );
  }

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

  // Alerts is converted from the entites collection stored in the facade into an
  // array since all views in the dashboard consume the data in this shape.
  dashAlerts$: Observable<AlertInfo[]> = this.dashData$.pipe(
    map((data: DashboardData) => data.alerts),
    map((alerts: Entity<AlertInfo>) => selectAllFromEntities<AlertInfo, number>(alerts))
  );

  get dashData(): DashboardData | null {
    return this.dashDataSubject.value;
  }

  loadDashData(params: URLSearchParams) {
    this.dashDataStateSubject.next(ApiStateManager.onPending());
    this.dataService
      .getDashData(params)
      .pipe(take(1))
      .subscribe({
        next: (data: DashboardApiData) => {
          const normalised: DashboardData = this.normaliseDashboardApiData(data);
          this.dashDataSubject.next(normalised);
          this.dashDataStateSubject.next(ApiStateManager.onCompleted());
        },
        error: (error: string) => {
          this.dashDataStateSubject.next(ApiStateManager.onFailed(error));
        },
      });
  }

  updateDashDataWithAlert(id: number, changes: Partial<AlertInfo>) {
    if (!this.dashData?.alerts) {
      return;
    }
    const alerts: Entity<AlertInfo> = this.alertsEntitiesService.updateOne(
      { id, changes },
      this.dashData.alerts
    );
    this.dashDataSubject.next({ ...this.dashData, alerts });
  }

  /**
   * Normalises the given API response data into a format which is most effectively
   * managed by the facade. The alerts collection is converted into an entities object to
   * update in this facade and is normalised back into an array prior to being consumed by
   * the dashboard views, preferrably through a memoised context provider.
   */
  private normaliseDashboardApiData(data: DashboardApiData): DashboardData {
    const alerts: Entity<AlertInfo> = data.alerts
      ? this.alertsEntitiesService.createEntities(data.alerts)
      : {};
    return { ...data, alerts };
  }
}

export const dashboardDataFacade: DashboardDataFacade = new DashboardDataFacade(
  new DashboardDataService()
);
