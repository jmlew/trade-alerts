import { Observable, catchError, map, throwError } from 'rxjs';
import { AjaxError, AjaxResponse, ajax } from 'rxjs/ajax';

import { getRxjsAjaxApiErrorMessage } from '@trade-alerts/shared/data-access';

import { DashApiUri } from '../entities/dashboard-api.enum';
import { DashboardApiData } from '../entities/dashboard-data.model';

/**
 * Data service to handle all HTTP requests for the domain.
 */
export class DashboardDataService {
  private urlBase = `${DashApiUri.Base}`;

  getDashData(params: URLSearchParams): Observable<DashboardApiData> {
    const url = `${this.urlBase}${DashApiUri.Dashboard}?${params.toString()}`;
    return ajax.get(url).pipe(
      map((response: AjaxResponse<DashboardApiData>) => response.response),
      catchError((error: AjaxError) =>
        throwError(() => getRxjsAjaxApiErrorMessage(error))
      )
    );
  }
}
