import { Module } from '@nestjs/common';

import { DashboardDataController } from './dashboard.controller';
import { DashboardDataService } from './dashboard.service';

@Module({
  imports: [],
  controllers: [DashboardDataController],
  providers: [DashboardDataService],
})
export class DashboardDataModule {}
