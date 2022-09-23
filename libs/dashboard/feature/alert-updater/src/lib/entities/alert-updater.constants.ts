import { AlertInfoField } from '@kdb-dash/dashboard/domain';
import { UiControlOption } from '@kdb-dash/shared/data-access';

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
