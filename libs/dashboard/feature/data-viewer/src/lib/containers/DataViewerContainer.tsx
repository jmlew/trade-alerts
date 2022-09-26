import { useEffect } from 'react';

import { Typography } from '@mui/material';
import { doAlertsExist } from '@trade-alerts/dashboard/domain';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';
import { GenericMessagePanel } from '@trade-alerts/dashboard/ui/common';
import { ApiStateManager } from '@trade-alerts/shared/data-access';
import { useAlert } from '@trade-alerts/shared/feature-alert';
import { ErrorMessage, Loading } from '@trade-alerts/shared/ui-common';

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
      {isCompleted(dashDataState) &&
        dashData != null &&
        (doAlertsExist(dashData) ? <DashLayout /> : <NoAlertsFoundMessage />)}
    </>
  );
}

function NoAlertsFoundMessage() {
  return (
    <GenericMessagePanel>
      <Typography variant="body1" align="center" color="primary.light">
        No Alerts found for the currrent filters.
      </Typography>
    </GenericMessagePanel>
  );
}
