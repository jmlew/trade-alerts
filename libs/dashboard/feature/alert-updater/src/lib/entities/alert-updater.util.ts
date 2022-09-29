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

import { alertSelectorLabelFields } from './alert-updater.constants';
import { AlertUpdateFormParams } from './alert-updater.model';

export function getInitialAlert(alerts: AlertInfo[] | null): AlertInfo | null {
  return (alerts && alerts[0]) || null;
}

export function getAllAlerts(dashData: DashboardData | undefined): AlertInfo[] | null {
  if (dashData == null || dashData.alerts == null) {
    return null;
  }
  return dashData.alerts;
}

export function getAlertOptions(alerts: AlertInfo[]): UiControlOption[] {
  return alerts.map((alert: AlertInfo) => ({
    value: alert.alertID,
    label: getAlertSelectorOptionLabel(alert),
  }));
}

function getAlertSelectorOptionLabel(alert: AlertInfo): string {
  return alertSelectorLabelFields
    .map((field: AlertInfoField) => alert[field])
    .join(' | ');
}

export function getAlertSelectorLabel(): string {
  return alertSelectorLabelFields
    .map((field: AlertInfoField) => alertInfoLabels.get(field) || field)
    .join(' | ');
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
