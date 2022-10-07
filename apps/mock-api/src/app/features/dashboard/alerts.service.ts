import { Injectable } from '@nestjs/common';
import {
  AlertInfo,
  AlertInfoField,
  AlertUpdateParams,
  DashboardApiData,
} from '@trade-alerts/dashboard/domain';
import { EntitiesManagerService } from '@trade-alerts/shared/util-common';

@Injectable()
export class AlertsService extends EntitiesManagerService<AlertInfo, number> {
  constructor(private dashboardData: DashboardApiData) {
    const primaryKey: keyof AlertInfo = AlertInfoField.AlertId;
    super(primaryKey);
    this.initDb();
  }

  initDb() {
    const { alerts } = this.dashboardData;
    this.createEntities(alerts);
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
