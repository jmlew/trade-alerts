import { Observable, catchError, map, throwError } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';

import { getAjaxApiErrorMessage } from '@trade-alerts/shared/util-common';

import { DashApiUri } from '../entities/dashboard-api.enum';
import { AlertUpdateParams, AlertUpdateResponse } from '../entities/dashboard-data.model';

/**
 * Data service to handle all HTTP requests for the domain.
 */
export class AlertManagerDataService {
  private urlBase = `${DashApiUri.Base}`;

  updateAlert(id: number, params: AlertUpdateParams): Observable<AlertUpdateResponse> {
    const url = `${this.urlBase}${DashApiUri.Alert}/${id}`;
    return ajax.put(url, params).pipe(
      map((response: AjaxResponse<AlertUpdateResponse>) => response.response),
      catchError((error: any) => throwError(() => getAjaxApiErrorMessage(error)))
    );
  }
}
