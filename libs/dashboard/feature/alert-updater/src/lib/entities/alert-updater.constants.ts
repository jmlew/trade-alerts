import { AlertInfoField } from '@trade-alerts/dashboard/domain';
import { UiControlOption } from '@trade-alerts/shared/data-access';

import { AlertActionType } from './alert-updater.enum';

export const alertSelectorLabelFields: AlertInfoField[] = [
  AlertInfoField.AlertId,
  AlertInfoField.Cif,
  AlertInfoField.RmId,
];

export const alertActionOptions: UiControlOption[] = [
  {
    value: AlertActionType.ActionTypeFoo,
    label: 'Some Alert Update',
  },
  {
    value: AlertActionType.ActionTypeBar,
    label: 'Some Other Alert Update',
  },
  {
    value: AlertActionType.ActionTypeBaz,
    label: 'And Another Alert Update',
  },
];
