import { AlertInfo, DashboardData, DateRange } from '@kdb-dash/dashboard/domain';
import { Injectable } from '@nestjs/common';

import * as dashboardsDb from '../../../assets/db/mock-data-kdb-dash.json';

@Injectable()
export class DashboardDataService {
  private db: DashboardData;

  constructor() {
    this.initDb();
  }

  initDb() {
    this.db = { ...dashboardsDb } as DashboardData;
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
}
