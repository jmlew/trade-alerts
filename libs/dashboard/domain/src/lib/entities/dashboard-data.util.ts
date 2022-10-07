import { Entity, selectAllFromEntities } from '@trade-alerts/shared/util-common';

import { AlertInfoField } from './dashboard-data-fields.enum';
import { AlertInfo, TradesInfo } from './dashboard-data.model';

/**
 * Converts the given alerts entities object into an array.
 */
export function getAllAlertsFromEntities(alerts: Entity<AlertInfo>): AlertInfo[] {
  return selectAllFromEntities<AlertInfo, number>(alerts);
}

export function getDashTradesLength(trades: TradesInfo[] | null): number {
  return trades != null ? trades.length : 0;
}

export function doAlertsExist(alerts: AlertInfo[] | null): boolean {
  return alerts != null && alerts.length > 0;
}

export function getAlertId(alert: AlertInfo): number {
  return alert[AlertInfoField.AlertId];
}

export function getAlertById(alerts: AlertInfo[], id: number): AlertInfo | null {
  return alerts.find((item: AlertInfo) => getAlertId(item) === id) || null;
}
