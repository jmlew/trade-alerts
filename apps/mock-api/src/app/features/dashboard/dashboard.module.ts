import { Module } from '@nestjs/common';

import { AlertManageController } from './alert-manage.controller';
import { DashboardController } from './dashboard.controller';
import { DashboardDataService } from './dashboard.service';

@Module({
  imports: [],
  controllers: [DashboardController, AlertManageController],
  providers: [DashboardDataService],
})
export class DashboardModule {}
