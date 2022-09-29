import { Injectable } from '@nestjs/common';
import {
  AlertInfo,
  AlertUpdateParams,
  AlertUpdateResponse,
  DashboardData,
  TradesInfo,
  getDashTrades,
} from '@trade-alerts/dashboard/domain';
import {
  getDateTimeFromMills,
  getDurationAsDays,
  getDurationFromMillsInDays,
  getDurationFromTo,
} from '@trade-alerts/shared/util-common';

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
    const originalTrades: TradesInfo[] | null = getDashTrades(data) || [];
    const trades: TradesInfo[] = originalTrades.filter(
      (trade: TradesInfo, index: number) => index < 7
    );
    return { ...data, alerts, trades };
  }

  // Returns data filterd to collections of length relative to that of the date range.
  getDashboardDataFromDateRange(
    from: number | string,
    to: number | string
  ): DashboardData {
    const dateFrom = getDateTimeFromMills(Number(from));
    const dateTo = getDateTimeFromMills(Number(to));
    const durationInDays: number = getDurationAsDays(getDurationFromTo(dateFrom, dateTo));

    const data: DashboardData = this.db;
    const originalTrades: TradesInfo[] | null = getDashTrades(data) || [];
    const trades: TradesInfo[] = originalTrades.filter(
      (trade: TradesInfo, index: number) => index < durationInDays
    );

    return { ...data, trades };
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
