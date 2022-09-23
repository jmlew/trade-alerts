import {
  AlertInfo,
  AlertInfoField,
  AlertOverviewInfo,
  alertInfoLabels,
} from '@kdb-dash/dashboard/domain';

const fields: AlertInfoField[] = [
  AlertInfoField.AlertId,
  AlertInfoField.RmId,
  AlertInfoField.Cif,
  AlertInfoField.Portfolio,
];

export function getAlertOverviews(alerts: AlertInfo[]): AlertOverviewInfo[] {
  return fields.map((field: AlertInfoField) => ({
    heading: alertInfoLabels.get(field) as string,
    values: alerts.map((alert: AlertInfo) => alert[field]),
  }));
}
