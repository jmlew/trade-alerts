import { Observable, catchError, map, throwError } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';

import { getAjaxApiErrorMessage } from '@trade-alerts/shared/util-common';

import { DashboardData } from '../entities/dashboard-data.model';
import { DataFilters } from '../entities/data-filters.model';
import { getSearchParamsFromDataFilters } from '../entities/data-filters.util';
import { DashApiUri } from './dashboard-api.model';

/**
 * Data service to handle all HTTP requests for the domain.
 */
export class DashboardDataService {
  private urlBase = `${DashApiUri.Base}${DashApiUri.Dashboard}`;

  getDashData(filters: DataFilters): Observable<DashboardData> {
    const params: string = getSearchParamsFromDataFilters(filters).toString();
    const url = `${this.urlBase}?${params}`;
    return ajax.get(url).pipe(
      map((response: AjaxResponse<DashboardData>) => response.response),
      catchError((error: any) => throwError(() => getAjaxApiErrorMessage(error)))
    );
  }
}
