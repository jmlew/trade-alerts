import { AjaxError } from 'rxjs/ajax';

/**
 * Returns the most useful value from the HTTP error to act as the error message.
 */

export function getRxjsAjaxApiErrorMessage(error: AjaxError): string {
  const { response, message } = error;
  return response ? response.message || response.error || message : message;
}

/**
 * Noralises the API request error by replacing the default HTTP Error.message value with the
 * most useful AxiosError value.
 */

export function normaliseRxjsAjaxApiErrorMessage(error: AjaxError) {
  error.message = getRxjsAjaxApiErrorMessage(error);
}
