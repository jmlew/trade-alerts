import { Observable, catchError, map, throwError } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';

import { getAjaxApiErrorMessage } from '@trade-alerts/shared/util-common';

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
      catchError((error: any) => throwError(() => getAjaxApiErrorMessage(error)))
    );
  }
}
