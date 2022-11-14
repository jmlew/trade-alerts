import {
  Observable,
  distinctUntilChanged,
  filter,
  map,
  distinctUntilKeyChanged,
} from 'rxjs';

import {
  ApiState,
  ApiStateField,
  ApiStateManager,
  ObservableStore,
} from '@trade-alerts/shared/data-access';
import { isNonNull } from '@trade-alerts/shared/util-common';

interface AlertState {
  apiState: ApiState;
  alertId: number | null;
}

const initialState: AlertState = {
  apiState: ApiStateManager.onIdle(),
  alertId: null,
};

class AlertManagerStore extends ObservableStore<AlertState> {
  override enableLogging = false;

  onPending() {
    const state: AlertState = this.getState();
    this.update({ ...state, apiState: ApiStateManager.onPending() });
  }

  onFailed(error: string) {
    const state: AlertState = this.getState();
    this.update({ ...state, apiState: ApiStateManager.onFailed(error) });
  }

  onCompleted() {
    const state: AlertState = this.getState();
    this.update({ ...state, apiState: ApiStateManager.onCompleted() });
  }

  onSetAlertId(alertId: number) {
    const state: AlertState = this.getState();
    this.update({ ...state, alertId });
  }

  selectApiState(): Observable<ApiState> {
    return this.selectState().pipe(
      map((state: AlertState) => state.apiState),
      distinctUntilKeyChanged(ApiStateField.Status),
      filter(isNonNull)
    );
  }

  selectAlertId(): Observable<number | null> {
    return this.selectState().pipe(
      map((state: AlertState) => state.alertId),
      distinctUntilChanged()
    );
  }
}

export const alertManagerStore: AlertManagerStore = new AlertManagerStore(initialState);
