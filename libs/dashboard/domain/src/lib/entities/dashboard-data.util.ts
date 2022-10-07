import { Entity, selectAllFromEntities } from '@trade-alerts/shared/util-common';

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
