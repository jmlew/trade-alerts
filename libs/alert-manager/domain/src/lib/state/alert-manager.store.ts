import { Observable, distinctUntilChanged, filter, map } from 'rxjs';

import {
  ApiState,
  ApiStateManager,
  ObservableStore,
} from '@trade-alerts/shared/data-access';
import { isNonNull } from '@trade-alerts/shared/util-common';

type State = {
  apiState: ApiState;
  alertId: number | null;
};

const initialState: State = {
  apiState: ApiStateManager.onInit(),
  alertId: null,
};

interface Store {
  onPending(): void;
  onFailed(error: unknown): void;
  onCompleted(): void;
  onSetAlertId(alertId: number): void;
  selectApiState(): Observable<ApiState>;
  selectAlertId(): Observable<number | null>;
}

class AlertManagerStore extends ObservableStore<State> implements Store {
  onPending() {
    this.state = { ...this.state, apiState: ApiStateManager.onPending() };
    this.subject.next(this.state);
  }

  onFailed(error: string) {
    this.state = { ...this.state, apiState: ApiStateManager.onFailed(error) };
    this.subject.next(this.state);
  }

  onCompleted() {
    this.state = { ...this.state, apiState: ApiStateManager.onCompleted() };
    this.subject.next(this.state);
  }

  onSetAlertId(alertId: number) {
    this.state = { ...this.state, alertId };
    this.subject.next(this.state);
  }

  selectApiState(): Observable<ApiState> {
    return this.selectState().pipe(
      map((state: State) => state.apiState),
      distinctUntilChanged(),
      filter(isNonNull)
    );
  }

  selectAlertId(): Observable<number | null> {
    return this.selectState().pipe(
      map((state: State) => state.alertId),
      distinctUntilChanged()
    );
  }
}

export const alertManagerStore: AlertManagerStore = new AlertManagerStore(initialState);
