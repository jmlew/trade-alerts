import { Observable } from 'rxjs';

import { ApiState } from '@trade-alerts/shared/data-access';

export interface ObservableApiState<T> {
  data: T | null;
  apiState: ApiState;
}

export interface ObservableStore<S> {
  selectState(): Observable<S>;
  getStateValue(): S;
  onClear(): void;
}

export interface ObservableApiStore<T, S> extends ObservableStore<S> {
  onPending(): void;
  onFailed(error: unknown): void;
  onCompleted(data: T): void;
  selectData(): Observable<T>;
  selectApiState(): Observable<ApiState>;
}
