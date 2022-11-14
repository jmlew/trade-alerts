import { Observable, filter, map, distinctUntilKeyChanged } from 'rxjs';

import {
  ApiState,
  ApiStateField,
  ApiStateManager,
  ObservableStore,
} from '@trade-alerts/shared/data-access';
import { isNonNull } from '@trade-alerts/shared/util-common';

import { DashboardData } from '../entities/dashboard-data.model';

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
  override enableLogging = true;
  override extraLoggingKeys: (keyof DashboardState)[] = ['apiState'];

  private constructor() {
    super(initialState);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DashboardDataStore();
    }
    return this.instance;
  }

  onPending() {
    this.state = { ...this.state, apiState: ApiStateManager.onPending() };
    this.applyState();
  }

  onFailed(error: string) {
    this.state = { ...this.state, apiState: ApiStateManager.onFailed(error) };
    this.applyState();
  }

  onCompleted(data: DashboardData) {
    this.state = { ...this.state, data, apiState: ApiStateManager.onCompleted() };
    this.applyState();
  }

  onUpdateData(data: DashboardData) {
    this.state = { ...this.state, data };
    this.applyState();
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
