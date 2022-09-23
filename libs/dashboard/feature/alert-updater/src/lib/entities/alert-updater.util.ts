import {
  AlertInfo,
  AlertInfoField,
  DashboardData,
  alertInfoLabels,
} from '@kdb-dash/dashboard/domain';
import { UiControlOption } from '@kdb-dash/shared/data-access';

import { alertActionOptions, alertSelectorLabelFields } from './alert-updater.constants';
import { AlertActionType } from './alert-updater.enum';
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

export function getAlertActionOptions(): UiControlOption[] {
  return alertActionOptions;
}

export function getDefaultAlertActionOption(): UiControlOption {
  return alertActionOptions[0];
}

export function getInitialFormValues(): AlertUpdateFormParams {
  return {
    action: getDefaultAlertActionOption().value as AlertActionType,
    comment: null,
  };
}
