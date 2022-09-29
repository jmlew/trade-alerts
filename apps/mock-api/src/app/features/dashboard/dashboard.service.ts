import { Injectable } from '@nestjs/common';
import {
  AlertInfo,
  AlertUpdateParams,
  AlertUpdateResponse,
  DashboardData,
  DateRange,
} from '@trade-alerts/dashboard/domain';

import * as dashboardsDb from '../../../assets/db/mock-dash.json';
import { AlertsService } from './alerts.service';

@Injectable()
export class DashboardDataService {
  private db: DashboardData;
  private alertsService: AlertsService;

  constructor() {
    this.initDb();
  }

  initDb() {
    this.db = { ...dashboardsDb } as DashboardData;
    this.alertsService = new AlertsService(this.db);
  }

  getDashboardDataFromAlertId(alertId: number): DashboardData {
    const data: DashboardData = this.db;
    const alerts: AlertInfo[] = data.alerts.filter(
      (item: AlertInfo) => Number(item.alertID) === Number(alertId)
    );
    return { ...data, alerts };
  }

  // TODO: Return data filterd to collections of length relative to that of the date range.
  getDashboardDataFromDateRange(range: DateRange): DashboardData {
    const data: DashboardData = this.db;
    return { ...data };
  }

  updateAlert(id: number, params: AlertUpdateParams): AlertUpdateResponse {
    this.alertsService.updateAlert(id, params);
    this.updateDbWithAlerts();
    return { id, status: 'success' };
  }

  private updateDbWithAlerts() {
    const alerts: AlertInfo[] = this.alertsService.getAllAlerts();
    this.db = { ...this.db, alerts };
  }

  doesAlertExist(id: number): boolean {
    return this.alertsService.doesAlertExist(id);
  }
}
