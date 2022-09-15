import { useEffect } from 'react';

import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { ApiStateManager } from '@kdb-dash/shared/data-access';
import { useAlert } from '@kdb-dash/shared/feature-alert';
import { ErrorMessage, JsonViewer, Loading } from '@kdb-dash/shared/ui-common';

import { DashLayout } from '../components/DashLayout';

const { getError, isCompleted, isFailed, isPending } = ApiStateManager;

interface DataViewerContainerProps {
  isErrorAlertsShown?: boolean;
}

export function DataViewerContainer({ isErrorAlertsShown }: DataViewerContainerProps) {
  const { dashData, dashDataState } = useDashboardDataContext();
  const { setAlert } = useAlert();

  // Show error alerts if enabled.
  useEffect(() => {
    if (!isErrorAlertsShown || dashDataState == null) {
      return;
    }
    const { getError, isFailed } = ApiStateManager;
    const message: string | null = getError(dashDataState);
    if (isFailed(dashDataState) && message) {
      setAlert({ isShown: true, message });
    }
  }, [dashDataState, isErrorAlertsShown, setAlert]);

  if (dashDataState == null) {
    return null;
  }

  return (
    <>
      {isPending(dashDataState) && <Loading message="Loading Dashboard" />}
      {isFailed(dashDataState) && <ErrorMessage>{getError(dashDataState)}</ErrorMessage>}
      {isCompleted(dashDataState) && dashData != null && (
        <>
          <DashLayout />
          {/* <JsonViewer data={dashData as object} sx={{ width: 0.8 }} /> */}
        </>
      )}
    </>
  );
}
