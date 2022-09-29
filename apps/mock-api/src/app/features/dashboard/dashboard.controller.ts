import { Observable } from 'rxjs';

import {
  DashApiUri,
  DashboardData,
  DataFilters,
  FiltersType,
} from '@trade-alerts/dashboard/domain';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Query,
} from '@nestjs/common';

import { toStreamWithDelay } from '../../shared/utils';
import { DashboardDataService } from './dashboard.service';

enum ErrorMessage {
  NoTypeIncluded = 'Type is not included in the request',
  NoAlertIdIncluded = 'Alert ID is not included in the request',
  NoDateRangeIncluded = 'Date range values are not included in the request',
  TestBadRequest = 'Sample response to simulate an invalid request.',
  NoDashboardMatch = 'Dashboard data does not exist in the Mock DB.',
}

@Controller(DashApiUri.Dashboard)
export class DashboardDataController {
  constructor(private readonly dataService: DashboardDataService) {}

  @Get('reset')
  getResetDb(): string {
    this.dataService.initDb();
    return 'Mock API Dashboards DB has been reset.';
  }

  /**
   * Query params contain filtes of two alternatives:
   * 1. Date Range: { type: '0', dateRange: '{"from":1661148200210,"to":1663740200215}' }
   * 2. Alert: { type: '1', alertId: '4561232123121' }
   */
  @Get()
  getDashboardData(@Query() filters: DataFilters): Observable<DashboardData> {
    if (filters.type == null) {
      throw new BadRequestException(ErrorMessage.NoTypeIncluded);
    }
    const type: FiltersType = Number(filters.type);
    switch (type) {
      case FiltersType.AlertId: {
        if (!filters.alertId) {
          throw new BadRequestException(ErrorMessage.NoAlertIdIncluded);
        }
        return this.toStream(
          this.dataService.getDashboardDataFromAlertId(filters.alertId)
        );
      }
      case FiltersType.DateRange: {
        if (!filters.dateRange) {
          throw new BadRequestException(ErrorMessage.NoDateRangeIncluded);
        }
        return this.toStream(
          this.dataService.getDashboardDataFromDateRange(filters.dateRange)
        );
      }
    }
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
