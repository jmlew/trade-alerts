import { Observable } from 'rxjs';

import {
  AlertInfo,
  AlertStatus,
  alertStatuses,
  dashboardDataFacade,
} from '@trade-alerts/dashboard/domain';

/**
 * API which exposes specific features for consumption by other domains. Cross-domain
 * access restrictions are enforced through the base eslint rules and only specific
 * features exported below can be accessed by domains added to the rule containing the
 * "domain:dashboard/api" tag.
 */

export function updateDashDataWithAlert(id: number, changes: Partial<AlertInfo>) {
  dashboardDataFacade.updateDashDataWithAlert(id, changes);
}
export const dashAlerts$: Observable<AlertInfo[]> = dashboardDataFacade.dashAlerts$;

export { alertStatuses, AlertStatus };
