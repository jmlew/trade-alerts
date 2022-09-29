import { Injectable } from '@nestjs/common';
import {
  AlertInfo,
  AlertInfoField,
  AlertUpdateParams,
  DashboardData,
} from '@trade-alerts/dashboard/domain';

import { EntitiesApiBaseService } from '../../shared/services';

@Injectable()
export class AlertsService extends EntitiesApiBaseService<AlertInfo, number> {
  constructor(private dashboardData: DashboardData) {
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