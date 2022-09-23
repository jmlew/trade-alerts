import { AlertActionType } from './alert-updater.enum';

export interface AlertUpdateFormParams {
  action: AlertActionType;
  comment: string | null;
}
