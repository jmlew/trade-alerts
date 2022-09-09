import { Module } from '@nestjs/common';

import { BaseModule } from './features/base/base.module';
import { DashboardDataModule } from './features/dashboard/dashboard.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [BaseModule, UsersModule, DashboardDataModule],
})
export class AppModule {}
