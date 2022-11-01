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

class AlertManagerStore extends ObservableStore<State> {
  override enableLogging = true;

  onPending() {
    this.state = { ...this.state, apiState: ApiStateManager.onPending() };
    this.applyState();
  }

  onFailed(error: string) {
    this.state = { ...this.state, apiState: ApiStateManager.onFailed(error) };
    this.applyState();
  }

  onCompleted() {
    this.state = { ...this.state, apiState: ApiStateManager.onCompleted() };
    this.applyState();
  }

  onSetAlertId(alertId: number) {
    this.state = { ...this.state, alertId };
    this.applyState();
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
