import { Observable, filter, map, distinctUntilKeyChanged } from 'rxjs';

import {
  ApiState,
  ApiStateField,
  ApiStateManager,
  ObservableStore,
} from '@trade-alerts/shared/data-access';
import { EntitiesService, Entity, isNonNull } from '@trade-alerts/shared/util-common';

import {
  AlertInfo,
  DashboardApiData,
  DashboardData,
} from '../entities/dashboard-data.model';
import { AlertInfoField } from '../entities/dashboard-data-fields.enum';

interface DashboardState {
  data: DashboardData | null;
  apiState: ApiState;
}

const initialState: DashboardState = {
  data: null,
  apiState: ApiStateManager.onIdle(),
};

export class DashboardDataStore extends ObservableStore<DashboardState> {
  private static instance: DashboardDataStore;
  private alertsEntitiesService: EntitiesService<AlertInfo, number>;

  override enableLogging = true;
  override extraLoggingKeys: (keyof DashboardState)[] = ['apiState'];

  private constructor() {
    super(initialState);
    this.alertsEntitiesService = new EntitiesService<AlertInfo, number>(
      AlertInfoField.AlertId
    );
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DashboardDataStore();
    }
    return this.instance;
  }

  onPending() {
    const state: DashboardState = this.getState();
    this.update({ ...state, apiState: ApiStateManager.onPending() });
  }

  onFailed(error: string) {
    const state: DashboardState = this.getState();
    this.update({ ...state, apiState: ApiStateManager.onFailed(error) });
  }

  /**
   * Stores the dashboard API data in a normalised format. The alerts collection is
   * converted into an entities object to update in this facade and is normalised back
   * into an array prior to being consumed by the dashboard views, preferrably through a
   * memoised context provider.
   */
  onCompleted(apiData: DashboardApiData) {
    const state: DashboardState = this.getState();
    const alerts: Entity<AlertInfo> = apiData.alerts
      ? this.alertsEntitiesService.setAll(apiData.alerts)
      : {};
    const data: DashboardData = { ...apiData, alerts };
    this.update({ ...state, data, apiState: ApiStateManager.onCompleted() });
  }

  onUpdateAlert(id: number, changes: Partial<AlertInfo>) {
    const state: DashboardState = this.getState();
    const data: DashboardData | null = state.data;
    if (!data?.alerts) {
      return;
    }
    const alerts: Entity<AlertInfo> = this.alertsEntitiesService.updateOne(
      { id, changes },
      data.alerts
    );
    this.onUpdateData({ ...data, alerts });
  }

  onUpdateData(data: DashboardData) {
    const state: DashboardState = this.getState();
    this.update({ ...state, data });
  }

  selectData(): Observable<DashboardData> {
    return this.selectState().pipe(
      map((state: DashboardState) => state.data),
      filter(isNonNull)
    );
  }

  selectApiState(): Observable<ApiState> {
    return this.selectState().pipe(
      map((state: DashboardState) => state.apiState),
      distinctUntilKeyChanged(ApiStateField.Status),
      filter(isNonNull)
    );
  }
}

export const dashboardDataStore: DashboardDataStore = DashboardDataStore.getInstance();
