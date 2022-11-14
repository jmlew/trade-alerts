import { take } from 'rxjs';

import { DashboardApiData } from '../entities/dashboard-data.model';
import { DashboardDataService } from '../infrastructure/dashboard-data.service';
import { DashboardDataStore, dashboardDataStore } from './dashboard-data.store';

export class DashboardDataEffects {
  constructor(
    private dataStore: DashboardDataStore,
    private dataService: DashboardDataService
  ) {}

  loadDashData(params: URLSearchParams) {
    this.dataStore.onPending();
    this.dataService
      .getDashData(params)
      .pipe(take(1))
      .subscribe({
        next: (data: DashboardApiData) => this.dataStore.onCompleted(data),
        error: (error: string) => this.dataStore.onFailed(error),
      });
  }
}

export const dashboardDataEffects: DashboardDataEffects = new DashboardDataEffects(
  dashboardDataStore,
  new DashboardDataService()
);
