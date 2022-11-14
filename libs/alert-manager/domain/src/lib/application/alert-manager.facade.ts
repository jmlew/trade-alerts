import { Observable, map } from 'rxjs';

import { dashAlerts$ } from '@trade-alerts/dashboard/api';
import { ApiState } from '@trade-alerts/shared/data-access';

import { Alert, AlertUpdateParams } from '../entities/alert-manager-data.model';
import { AlertManagerEffects, alertManagerEffects } from '../state/alert-manager.effects';
import { AlertManagerStore, alertManagerStore } from '../state/alert-manager.store';

/**
 * Facade to interface between containers / context providers and http services.
 * Exposes a simplified API for state management through custom observabe stores.
 */

class AlertManagerFacade {
  // Store values exposed as readonly observables.
  alertManagerState$: Observable<ApiState> = this.store.selectApiState();
  alertId$: Observable<number | null> = this.store.selectAlertId();

  // Stream of domain alerts converted from the Dashboard domain's alerts.
  alerts$: Observable<Alert[]> = dashAlerts$.pipe(
    map((alerts: Alert[]) => this.mapToDomainAlerts(alerts))
  );

  constructor(private store: AlertManagerStore, private effects: AlertManagerEffects) {}

  setAlertId(id: number) {
    this.store.onSetAlertId(id);
  }

  updateAlert(id: number, params: AlertUpdateParams) {
    this.effects.updateAlert(id, params);
  }

  /**
   * Maps the full Alert as used in the Dashboard domain to a simplified model which
   * includes a subset of filds as used in this domain.
   */
  private mapToDomainAlerts(alerts: Alert[]): Alert[] {
    return alerts.map((alert: Alert) => {
      const { alertID, status, cif, rmId } = alert;
      return { alertID, status, cif, rmId };
    });
  }
}

export const alertManagerFacade: AlertManagerFacade = new AlertManagerFacade(
  alertManagerStore,
  alertManagerEffects
);
