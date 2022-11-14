import { take } from 'rxjs';

import { updateDashDataWithAlert } from '@trade-alerts/dashboard/api';

import { Alert, AlertUpdateParams } from '../entities/alert-manager-data.model';
import { AlertManagerDataService } from '../infrastructure/alert-manager-data.service';
import { AlertManagerStore, alertManagerStore } from './alert-manager.store';

export class AlertManagerEffects {
  constructor(
    private store: AlertManagerStore,
    private dataService: AlertManagerDataService
  ) {}

  updateAlert(id: number, params: AlertUpdateParams) {
    this.store.onPending();
    this.dataService
      .updateAlert(id, params)
      .pipe(take(1))
      .subscribe({
        next: () => {
          // Update the alert in the dashboard alerts collection in the dashboard facade.
          const changes: Partial<Alert> = { status: params.status };
          updateDashDataWithAlert(id, changes);
          this.store.onCompleted();
        },
        error: (error: string) => this.store.onFailed(error),
      });
  }
}

export const alertManagerEffects: AlertManagerEffects = new AlertManagerEffects(
  alertManagerStore,
  new AlertManagerDataService()
);
