import { Observable, map, take } from 'rxjs';

import { dashAlerts$, updateDashDataWithAlert } from '@trade-alerts/dashboard/api';
import { ApiState } from '@trade-alerts/shared/data-access';

import { Alert, AlertUpdateParams } from '../entities/alert-manager-data.model';
import { AlertManagerDataService } from '../infrastructure/alert-manager-data.service';
import { alertManagerStore } from '../state/alert-manager.store';

/**
 * Facade to interface between containers / context providers and http services. Converts
 * results to observable streams and acts as a reactive state management store.
 */

class AlertManagerFacade {
  constructor(private dataService: AlertManagerDataService) {}

  // Store values exposed as readonly observables.
  alertManagerState$: Observable<ApiState> = alertManagerStore.selectApiState();
  alertId$: Observable<number | null> = alertManagerStore.selectAlertId();

  // Stream of simple alerts created from the dashboard alerts stream.
  alerts$: Observable<Alert[]> = dashAlerts$.pipe(
    map((alerts: Alert[]) =>
      alerts.map((alert: Alert) => {
        const { alertID, status, cif, rmId } = alert;
        return { alertID, status, cif, rmId };
      })
    )
  );

  setAlertId(id: number) {
    alertManagerStore.onSetAlertId(id);
  }

  updateAlert(id: number, params: AlertUpdateParams) {
    alertManagerStore.onPending();
    this.dataService
      .updateAlert(id, params)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.updateDashboardDataWithAlertParams(id, params);
          alertManagerStore.onCompleted();
        },
        error: (error: string) => alertManagerStore.onFailed(error),
      });
  }

  /**
   * Updates the alert in the dashboard alerts collection in the dashboard facade.
   */
  private updateDashboardDataWithAlertParams(id: number, params: AlertUpdateParams) {
    const changes: Partial<Alert> = { status: params.status };
    updateDashDataWithAlert(id, changes);
  }
}

export const alertManagerFacade: AlertManagerFacade = new AlertManagerFacade(
  new AlertManagerDataService()
);
