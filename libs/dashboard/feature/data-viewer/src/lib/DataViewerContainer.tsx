import { useDashboardDataContext } from '@kdb-dash/dashboard/domain';
import { ApiStateManager } from '@kdb-dash/shared/data-access';
import { ErrorMessage, JsonViewer, Loading } from '@kdb-dash/shared/ui-common';

const { getError, isCompleted, isFailed, isPending } = ApiStateManager;

export function DataViewerContainer() {
  const { dashData, dashDataState } = useDashboardDataContext();

  if (dashDataState == null) {
    return null;
  }
  return (
    <>
      {isPending(dashDataState) && <Loading message="Loading Dashboard" />}
      {isFailed(dashDataState) && <ErrorMessage>{getError(dashDataState)}</ErrorMessage>}
      {isCompleted(dashDataState) && dashData != null && (
        <JsonViewer data={dashData as object} sx={{ width: 0.8 }} />
      )}
    </>
  );
}
