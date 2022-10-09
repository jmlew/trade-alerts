import { Alert, AlertField, AlertUpdateParams } from '@trade-alerts/alert-manager/domain';
import { AlertStatus, alertStatuses } from '@trade-alerts/dashboard/api';
import { UiControlOption } from '@trade-alerts/shared/data-access';

import { alertLabels, alertSelectorLabelFields } from './manager-alerts.constants';
import { AlertUpdateFormParams } from './manager-alerts.model';

function getAlertId(alert: Alert): number {
  return alert[AlertField.AlertId];
}

export function getAlertById(alerts: Alert[], id: number): Alert | null {
  return alerts.find((item: Alert) => getAlertId(item) === id) || null;
}

export function getAlertOptions(alerts: Alert[]): UiControlOption[] {
  return alerts.map((alert: Alert) => ({
    value: alert.alertID,
    label: getAlertSelectorOptionLabel(alert),
  }));
}

function getAlertSelectorOptionLabel(alert: Alert): string {
  const initial: string | number = alert[alertSelectorLabelFields[0]];
  const extras: string = alertSelectorLabelFields
    .filter((_, index: number) => index > 0)
    .map((field: AlertField) => alert[field])
    .join(' | ');
  return `${initial} (${extras})`;
}

export function getAlertSelectorLabel(): string {
  const initial: string =
    alertLabels.get(alertSelectorLabelFields[0]) || alertSelectorLabelFields[0];
  const extras: string = alertSelectorLabelFields
    .filter((_, index: number) => index > 0)
    .map((field: AlertField) => alertLabels.get(field) || field)
    .join(' | ');
  return `${initial} (${extras})`;
}

export function getAlertStatusOptions(): UiControlOption[] {
  return Array.from(alertStatuses, ([key, value]) => ({
    value: key,
    label: value,
  }));
}

export function getAlertStatusLabel(status: AlertStatus): string {
  return alertStatuses.get(status) || status.toString();
}

export function getInitialFormValues(currentAlert: Alert | null): AlertUpdateFormParams {
  const status: AlertStatus = currentAlert
    ? currentAlert[AlertField.Status]
    : Array.from(alertStatuses.keys())[0];
  return {
    status,
    comment: null,
  };
}

// Placeholder for API serialisation.
export function getAlertUpdateParams(values: AlertUpdateFormParams): AlertUpdateParams {
  return values as AlertUpdateParams;
}
