import { Observable } from 'rxjs';

import { DashboardData } from '@kdb-dash/dashboard/domain';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpException,
} from '@nestjs/common';

import { toStreamWithDelay } from '../../shared/utils';
import { DashboardDataService } from './dashboard.service';

enum ErrorMessage {
  TestBadRequest = 'Sample response to simulate an invalid request.',
  NoDashboardMatch = 'Dashboard data does not exist in the Mock DB.',
}

@Controller('dashboard')
export class DashboardDataController {
  constructor(private readonly dataService: DashboardDataService) {}

  @Get('reset')
  getResetDb(): string {
    this.dataService.initDb();
    return 'Mock API Dashboards DB has been reset.';
  }

  // @Get()
  getDashboardData(): Observable<DashboardData> {
    return this.toStream(this.dataService.getDashboardData());
  }

  /**
   * Failed versions. Test the below by uncommenting the CRUD method decorator in the
   * corresponding functions above to disable and use the below versions instead.
   */

  @Get()
  @HttpCode(400)
  getDashboardDataFailed(): Observable<HttpException> {
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  private toStream<T>(data: T, delay = 400) {
    return toStreamWithDelay(data, delay);
  }
}
