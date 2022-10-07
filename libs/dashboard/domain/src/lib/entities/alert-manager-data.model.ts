import { AlertStatus } from './alert-status.enum';

export interface AlertUpdateParams {
  status: AlertStatus;
  comment: string | null;
}

export type AlertUpdateResponseStatus = 'success' | 'failed';
export interface AlertUpdateResponse {
  id: number;
  status: AlertUpdateResponseStatus;
}

// Simplified AlertInfo matching the bounded context of the Alert Manager domain.
export interface Alert {
  alertID: number;
  status: AlertStatus;
  cif: string;
  rmId: string;
}
