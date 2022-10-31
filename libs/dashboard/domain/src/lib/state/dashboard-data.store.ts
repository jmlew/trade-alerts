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

interface Store {
  onPending(): void;
  onFailed(error: unknown): void;
  onCompleted(data: DashboardData): void;
  selectData(): Observable<DashboardData>;
  selectApiState(): Observable<ApiState>;
}

class DashboardDataStore extends ObservableStore<State> implements Store {
  onPending() {
    this.state = { ...this.state, apiState: ApiStateManager.onPending() };
    this.subject.next(this.state);
  }

  onFailed(error: string) {
    this.state = { ...this.state, apiState: ApiStateManager.onFailed(error) };
    this.subject.next(this.state);
  }

  onCompleted(data: DashboardData) {
    this.state = { ...this.state, data, apiState: ApiStateManager.onCompleted() };
    this.subject.next(this.state);
  }

  onUpdateData(data: DashboardData) {
    this.state = { ...this.state, data };
    this.subject.next(this.state);
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
