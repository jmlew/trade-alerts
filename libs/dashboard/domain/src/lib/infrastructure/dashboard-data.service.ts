import { Observable, catchError, from, map, of, throwError } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';

import { getAjaxApiErrorMessage } from '@trade-alerts/shared/util-common';

import {
  AlertUpdateParams,
  AlertUpdateResponse,
  DashboardData,
} from '../entities/dashboard-data.model';
import { DashApiUri } from './dashboard-api.enum';

/**
 * Data service to handle all HTTP requests for the domain.
 */
export class DashboardDataService {
  private urlBase = `${DashApiUri.Base}`;

  getDashData(params: URLSearchParams): Observable<DashboardData> {
    const url = `${this.urlBase}${DashApiUri.Dashboard}?${params.toString()}`;
    return ajax.get(url).pipe(
      map((response: AjaxResponse<DashboardData>) => response.response),
      catchError((error: any) => throwError(() => getAjaxApiErrorMessage(error)))
    );
  }

  updateAlert(id: number, params: AlertUpdateParams): Observable<AlertUpdateResponse> {
    const promise: Promise<AlertUpdateResponse> = new Promise((resolve, reject) => {
      const response: AlertUpdateResponse = { id, status: 'success' };
      setTimeout(() => resolve(response), 600);
    });
    return from(promise);
  }
}
