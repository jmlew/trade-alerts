import { Observable, map } from 'rxjs';

import { ApiState } from '@trade-alerts/shared/data-access';
import { Entity, selectAllFromEntities } from '@trade-alerts/shared/util-common';

import { AlertInfo, DashboardData } from '../entities/dashboard-data.model';
import {
  DashboardDataEffects,
  dashboardDataEffects,
} from '../state/dashboard-data.effects';
import { DashboardDataStore, dashboardDataStore } from '../state/dashboard-data.store';

/**
 * Facade to interface between containers / context providers and http services.
 * Exposes a simplified API for state management through custom observabe stores.
 */

export class DashboardDataFacade {
  // Store values exposed as readonly observables.
  dashData$: Observable<DashboardData> = this.dataStore.selectData();
  dashDataState$: Observable<ApiState> = this.dataStore.selectApiState();

  // Alerts is converted from the entites collection stored in the facade into an
  // array since all views in the dashboard consume the data in this shape.
  dashAlerts$: Observable<AlertInfo[]> = this.dashData$.pipe(
    map((data: DashboardData) => data.alerts),
    map((alerts: Entity<AlertInfo>) => selectAllFromEntities<AlertInfo, number>(alerts))
  );

  constructor(
    private dataStore: DashboardDataStore,
    private dataEffects: DashboardDataEffects
  ) {}

  loadDashData(params: URLSearchParams) {
    this.dataEffects.loadDashData(params);
  }

  updateDashDataWithAlert(id: number, changes: Partial<AlertInfo>) {
    this.dataStore.onUpdateAlert(id, changes);
  }
}

export const dashboardDataFacade: DashboardDataFacade = new DashboardDataFacade(
  dashboardDataStore,
  dashboardDataEffects
);
