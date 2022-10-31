import { BehaviorSubject, Observable, distinctUntilChanged, filter, map } from 'rxjs';

import { ApiState, ApiStateManager } from '@trade-alerts/shared/data-access';
import { isNonNull } from '@trade-alerts/shared/util-common';

import { DashboardData } from '../entities/dashboard-data.model';
import { ObservableApiState, ObservableApiStore } from './observable-store.model';

export type DashboardDataState = ObservableApiState<DashboardData>;

const initialState: DashboardDataState = {
  data: null,
  apiState: ApiStateManager.onInit(),
};

class DashboardDataStore
  implements ObservableApiStore<DashboardData, DashboardDataState>
{
  private state: DashboardDataState;
  private initialState: DashboardDataState;
  private subject: BehaviorSubject<DashboardDataState>;

  constructor(initialState: DashboardDataState) {
    this.initialState = initialState;
    this.state = { ...initialState };
    this.subject = new BehaviorSubject(initialState);
  }

  getStateValue() {
    return this.subject.getValue();
  }

  // State actions.
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

  onClear() {
    this.state = { ...this.initialState };
    this.subject.next(this.state);
  }

  // State selectors.
  selectState(): Observable<DashboardDataState> {
    return this.subject.pipe(distinctUntilChanged(), filter(isNonNull));
  }

  selectData(): Observable<DashboardData> {
    return this.selectState().pipe(
      map((state: DashboardDataState) => state.data),
      distinctUntilChanged(),
      filter(isNonNull)
    );
  }

  selectApiState(): Observable<ApiState> {
    return this.selectState().pipe(
      map((state: DashboardDataState) => state.apiState),
      distinctUntilChanged(),
      filter(isNonNull)
    );
  }
}

const dashboardDataStore = new DashboardDataStore(initialState);
export { dashboardDataStore };
