import { Injectable } from '@nestjs/common';
import { AlertUpdateParams } from '@trade-alerts/alert-manager/domain';
import {
  AlertInfo,
  AlertInfoField,
  DashboardApiData,
} from '@trade-alerts/dashboard/domain';
import { EntitiesManagerService } from '@trade-alerts/shared/util-common';

@Injectable()
export class AlertManageService extends EntitiesManagerService<AlertInfo, number> {
  constructor(private db: DashboardApiData) {
    const primaryKey: keyof AlertInfo = AlertInfoField.AlertId;
    super(primaryKey);
    this.initDb();
  }

  initDb() {
    const { alerts } = this.db;
    this.setEntities(alerts);
  }

  getAllAlerts(): AlertInfo[] {
    return this.selectAll();
  }

  updateAlert(id: number, params: AlertUpdateParams) {
    const updates: Partial<AlertInfo> = { alertID: id, status: params.status };
    this.updateEntity(id, updates);
  }

  doesAlertExist(id: number): boolean {
    return this.doesEntityExist(id);
  }
}
