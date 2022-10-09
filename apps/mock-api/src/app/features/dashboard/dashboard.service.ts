import { Injectable } from '@nestjs/common';
import {
  AlertUpdateParams,
  AlertUpdateResponse,
} from '@trade-alerts/alert-manager/domain';
import { AlertInfo, DashboardApiData, TradesInfo } from '@trade-alerts/dashboard/domain';
import {
  getDateTimeFromMills,
  getDurationAsDays,
  getDurationFromTo,
} from '@trade-alerts/shared/util-common';

import * as dashboardsDb from '../../../assets/db/mock-dash.json';
import { AlertManageService } from './alert-manage.service';

@Injectable()
export class DashboardDataService {
  private db: DashboardApiData;
  private alertsService: AlertManageService;

  constructor() {
    this.initDb();
  }

  initDb() {
    this.db = { ...dashboardsDb } as DashboardApiData;
    this.alertsService = new AlertManageService(this.db);
  }

  getDashboardDataFromAlertId(alertId: number): DashboardApiData {
    const data: DashboardApiData = this.db;
    const currentAlerts = this.alertsService.getAllAlerts();
    const alerts: AlertInfo[] = currentAlerts.filter(
      (item: AlertInfo) => Number(item.alertID) === Number(alertId)
    );
    const originalTrades: TradesInfo[] = data?.trades || [];
    const trades: TradesInfo[] = originalTrades.filter(
      (trade: TradesInfo, index: number) => index < 7
    );
    return { ...data, alerts, trades };
  }

  // Returns data filterd to collections of length relative to that of the date range.
  getDashboardDataFromDateRange(
    from: number | string,
    to: number | string
  ): DashboardApiData {
    const dateFrom = getDateTimeFromMills(Number(from));
    const dateTo = getDateTimeFromMills(Number(to));
    const durationInDays: number = getDurationAsDays(getDurationFromTo(dateFrom, dateTo));

    const data: DashboardApiData = this.db;
    const originalTrades: TradesInfo[] | null = data?.trades || [];
    const trades: TradesInfo[] = originalTrades.filter(
      (trade: TradesInfo, index: number) => index < durationInDays
    );
    const alerts = this.alertsService.getAllAlerts();
    return { ...data, trades, alerts };
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
