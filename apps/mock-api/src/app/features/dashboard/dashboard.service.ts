import { DashboardData } from '@kdb-dash/dashboard/domain';
import { Injectable } from '@nestjs/common';

import * as dashboardsDb from '../../../assets/db/kdb-dash.json';

@Injectable()
export class DashboardDataService {
  private db: DashboardData;

  constructor() {
    this.initDb();
  }

  initDb() {
    this.db = { ...dashboardsDb } as DashboardData;
  }

  getDashboardData(): DashboardData {
    const data: DashboardData = this.db;
    return { ...data };
  }
}
