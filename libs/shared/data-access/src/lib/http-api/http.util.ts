import { AxiosError } from 'axios';
import { AjaxError } from 'rxjs/ajax';

/**
 * Returns the most useful value from the Axios HTTP error to act as the error message.
 */
export function getAxiosApiErrorMessage(error: AxiosError): string {
  if (error.response) {
    const { response } = error;
    return response.data
      ? response.data.message
      : response.data.error || response.statusText || response.status;
  } else if (error.request) {
    const { request } = error;
    return request.statusText || request.responseText || request.status;
  } else {
    return error.message;
  }
}

export function getAjaxApiErrorMessage(error: AjaxError): string {
  if (error.response) {
    const { response } = error;
    return response.message || response.error || `${response.statusCode} Error`;
  } else {
    return error.message;
  }
}

/**
 * Noralises the API request error by replacing the default HTTP Error.message value with the
 * most useful AxiosError value.
 */
export function normaliseAxiosApiErrorMessage(error: AxiosError) {
  error.message = getAxiosApiErrorMessage(error);
}

export function normaliseAjaxApiErrorMessage(error: AjaxError) {
  error.message = getAjaxApiErrorMessage(error);
}
