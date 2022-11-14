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
  alertId: number | null;
  apiState: ApiState;
}

const initialState: AlertState = {
  alertId: null,
  apiState: ApiStateManager.onIdle(),
};

export class AlertManagerStore extends ObservableStore<AlertState> {
  override enableLogging = true;
  private static instance: AlertManagerStore;

  private constructor() {
    super(initialState);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AlertManagerStore();
    }
    return this.instance;
  }

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

export const alertManagerStore: AlertManagerStore = AlertManagerStore.getInstance();
