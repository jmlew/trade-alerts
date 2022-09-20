import { useEffect } from 'react';

import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { ApiStateManager } from '@kdb-dash/shared/data-access';
import { useAlert } from '@kdb-dash/shared/feature-alert';
import { ErrorMessage, Loading } from '@kdb-dash/shared/ui-common';

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
      {isPending(dashDataState) && <Loading message="Loading Data" top={6} />}
      {isFailed(dashDataState) && <ErrorMessage>{getError(dashDataState)}</ErrorMessage>}
      {isCompleted(dashDataState) && dashData != null && <DashLayout />}
    </>
  );
}
