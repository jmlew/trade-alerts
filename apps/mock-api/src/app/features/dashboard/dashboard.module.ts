import { Module } from '@nestjs/common';

import { AlertsDataController } from './alerts.controller';
import { DashboardDataController } from './dashboard.controller';
import { DashboardDataService } from './dashboard.service';

@Module({
  imports: [],
  controllers: [DashboardDataController, AlertsDataController],
  providers: [DashboardDataService],
})
export class DashboardDataModule {}
