import { AlertField } from '@trade-alerts/alert-manage/domain';

export const alertSelectorLabelFields: AlertField[] = [
  AlertField.AlertId,
  AlertField.Cif,
  AlertField.RmId,
];

export const alertLabels: Map<AlertField, string> = new Map([
  [AlertField.AlertId, 'Alert ID'],
  [AlertField.Status, 'Status'],
  [AlertField.Cif, 'CIF'],
  [AlertField.RmId, 'RM ID'],
]);
