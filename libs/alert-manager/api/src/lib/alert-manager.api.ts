import { alertManagerFacade } from '@trade-alerts/alert-manager/domain';
import { AlertManagerShell } from '@trade-alerts/alert-manager/shell';

/**
 * API which exposes specific features for consumption by other domains.  Cross-domain
 * access restrictions are enforced through the base eslint rules and only specific
 * features exported below can be accessed by domains added to the rule containing the
 * "name:alert-manage-api" tag.
 */

export function setAlertId(id: number) {
  alertManagerFacade.setAlertId(id);
}

export { AlertManagerShell };
