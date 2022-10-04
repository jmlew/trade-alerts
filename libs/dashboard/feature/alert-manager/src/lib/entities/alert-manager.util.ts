import {
  AlertInfo,
  AlertInfoField,
  AlertStatus,
  AlertUpdateParams,
  DashboardData,
  alertInfoLabels,
  alertStatuses,
} from '@trade-alerts/dashboard/domain';
import { UiControlOption } from '@trade-alerts/shared/data-access';

import { alertSelectorLabelFields } from './alert-manager.constants';
import { AlertUpdateFormParams } from './alert-manager.model';

export function getInitialAlert(alerts: AlertInfo[] | null): AlertInfo | null {
  return (alerts && alerts[0]) || null;
}

export function getAlertOptions(alerts: AlertInfo[]): UiControlOption[] {
  return alerts.map((alert: AlertInfo) => ({
    value: alert.alertID,
    label: getAlertSelectorOptionLabel(alert),
  }));
}

function getAlertSelectorOptionLabel(alert: AlertInfo): string {
  const initial: string | number = alert[alertSelectorLabelFields[0]];
  const extras: string = alertSelectorLabelFields
    .filter((_, index: number) => index > 0)
    .map((field: AlertInfoField) => alert[field])
    .join(' | ');
  return `${initial} (${extras})`;
}

export function getAlertSelectorLabel(): string {
  const initial: string =
    alertInfoLabels.get(alertSelectorLabelFields[0]) || alertSelectorLabelFields[0];
  const extras: string = alertSelectorLabelFields
    .filter((_, index: number) => index > 0)
    .map((field: AlertInfoField) => alertInfoLabels.get(field) || field)
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

export function getInitialFormValues(
  currentAlert: AlertInfo | null
): AlertUpdateFormParams {
  const status: AlertStatus = currentAlert
    ? currentAlert[AlertInfoField.Status]
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
