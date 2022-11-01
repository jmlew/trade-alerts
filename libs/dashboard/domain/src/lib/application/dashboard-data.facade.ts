import { Observable, map, take } from 'rxjs';

import { ApiState } from '@trade-alerts/shared/data-access';
import {
  EntitiesService,
  Entity,
  selectAllFromEntities,
} from '@trade-alerts/shared/util-common';

import { AlertInfoField } from '../entities/dashboard-data-fields.enum';
import {
  AlertInfo,
  DashboardApiData,
  DashboardData,
} from '../entities/dashboard-data.model';
import { DashboardDataService } from '../infrastructure/dashboard-data.service';
import { dashboardDataStore } from '../state/dashboard-data.store';

/**
 * Facade to interface between containers / context providers and http services.
 * Exposes a simplified API for state management through custom observabe stores.
 */

class DashboardDataFacade {
  private alertsEntitiesService: EntitiesService<AlertInfo, number>;

  // Store values exposed as readonly observables.
  dashData$: Observable<DashboardData> = dashboardDataStore.selectData();
  dashDataState$: Observable<ApiState> = dashboardDataStore.selectApiState();

  // Alerts is converted from the entites collection stored in the facade into an
  // array since all views in the dashboard consume the data in this shape.
  dashAlerts$: Observable<AlertInfo[]> = this.dashData$.pipe(
    map((data: DashboardData) => data.alerts),
    map((alerts: Entity<AlertInfo>) => selectAllFromEntities<AlertInfo, number>(alerts))
  );

  constructor(private dataService: DashboardDataService) {
    this.alertsEntitiesService = new EntitiesService<AlertInfo, number>(
      AlertInfoField.AlertId
    );
  }

  loadDashData(params: URLSearchParams) {
    dashboardDataStore.onPending();
    this.dataService
      .getDashData(params)
      .pipe(take(1))
      .subscribe({
        next: (data: DashboardApiData) =>
          dashboardDataStore.onCompleted(this.normaliseDashboardApiData(data)),
        error: (error: string) => dashboardDataStore.onFailed(error),
      });
  }

  updateDashDataWithAlert(id: number, changes: Partial<AlertInfo>) {
    const data: DashboardData | null = dashboardDataStore.selectStateValue().data;
    if (!data?.alerts) {
      return;
    }
    const alerts: Entity<AlertInfo> = this.alertsEntitiesService.updateOne(
      { id, changes },
      data.alerts
    );
    dashboardDataStore.onUpdateData({ ...data, alerts });
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
