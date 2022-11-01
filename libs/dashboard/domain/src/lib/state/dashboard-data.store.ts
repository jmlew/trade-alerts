import { Observable, distinctUntilChanged, filter, map } from 'rxjs';

import {
  ApiState,
  ApiStateManager,
  ObservableStore,
} from '@trade-alerts/shared/data-access';
import { isNonNull } from '@trade-alerts/shared/util-common';

import { DashboardData } from '../entities/dashboard-data.model';

interface State {
  data: DashboardData | null;
  apiState: ApiState;
}

const initialState: State = {
  data: null,
  apiState: ApiStateManager.onInit(),
};

class DashboardDataStore extends ObservableStore<State> {
  override enableLogging = true;

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
      map((state: State) => state.data),
      distinctUntilChanged(),
      filter(isNonNull)
    );
  }

  selectApiState(): Observable<ApiState> {
    return this.selectState().pipe(
      map((state: State) => state.apiState),
      distinctUntilChanged(),
      filter(isNonNull)
    );
  }
}

export const dashboardDataStore: DashboardDataStore = new DashboardDataStore(
  initialState
);
