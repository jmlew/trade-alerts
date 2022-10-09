import { Observable, catchError, map, throwError } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';

import { getAjaxApiErrorMessage } from '@trade-alerts/shared/util-common';

import { AlertManagerApiUri } from '../entities/alert-manager-api.enum';
import {
  AlertUpdateParams,
  AlertUpdateResponse,
} from '../entities/alert-manager-data.model';

/**
 * Data service to handle all HTTP requests for the domain.
 */
export class AlertManagerDataService {
  private urlBase = `${AlertManagerApiUri.Base}`;

  updateAlert(id: number, params: AlertUpdateParams): Observable<AlertUpdateResponse> {
    const url = `${this.urlBase}${AlertManagerApiUri.Alert}/${id}`;
    return ajax.put(url, params).pipe(
      map((response: AjaxResponse<AlertUpdateResponse>) => response.response),
      catchError((error: any) => throwError(() => getAjaxApiErrorMessage(error)))
    );
  }
}
