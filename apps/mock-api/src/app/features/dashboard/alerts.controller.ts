import { Observable } from 'rxjs';

import {
  AlertUpdateParams,
  AlertUpdateResponse,
  AlertManagerApiUri,
} from '@trade-alerts/dashboard/domain';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Put,
} from '@nestjs/common';

import { toStreamWithDelay } from '../../shared/utils';
import { DashboardDataService } from './dashboard.service';

enum ErrorMessage {
  NoAlertMatch = 'Alert does not exist in the Mock DB.',
  TestBadRequest = 'Sample response to simulate an invalid request.',
}

@Controller(AlertManagerApiUri.Alert)
export class AlertsDataController {
  constructor(private readonly dataService: DashboardDataService) {}

  @Get('reset')
  getResetDb(): string {
    this.dataService.initDb();
    return 'Mock API Dashboards DB has been reset.';
  }

  @Put(':id')
  updateAlert(
    @Param('id') id: string,
    @Body() params: AlertUpdateParams
  ): Observable<AlertUpdateResponse> {
    const alertId: number = parseInt(id, 10);
    if (!this.dataService.doesAlertExist(alertId)) {
      throw new BadRequestException(ErrorMessage.NoAlertMatch);
    }
    return this.toStream(this.dataService.updateAlert(alertId, params));
  }

  /**
   * Failed versions. Test the below by uncommenting the CRUD method decorator in the
   * corresponding functions above to disable and use the below versions instead.
   */

  @Put(':id')
  @HttpCode(400)
  updateAlertFailed(): Observable<HttpException> {
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  private toStream<T>(data: T, delay = 400) {
    return toStreamWithDelay(data, delay);
  }
}
