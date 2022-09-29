import { useEffect } from 'react';

import { Typography } from '@mui/material';
import { doAlertsExist } from '@trade-alerts/dashboard/domain';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';
import { GenericMessagePanel } from '@trade-alerts/dashboard/ui/common';
import { useApiStateReference } from '@trade-alerts/shared/data-access';
import { useAlert } from '@trade-alerts/shared/feature-alert';
import { ErrorMessage, Loading } from '@trade-alerts/shared/ui-common';

import { DashLayout } from '../components/DashLayout';

interface DataViewerContainerProps {
  isErrorAlertsShown?: boolean;
}

export function DataViewerContainer({ isErrorAlertsShown }: DataViewerContainerProps) {
  const { setAlert } = useAlert();
  const { dashData, dashDataState } = useDashboardDataContext();
  const dashDataStateRef = useApiStateReference(dashDataState);
  const { isFailed, isPending, isCompleted, getError } = dashDataStateRef;

  // Show error alerts if enabled.
  useEffect(() => {
    if (!isErrorAlertsShown) {
      return;
    }
    if (isFailed()) {
      setAlert({ isShown: true, message: getError() || 'Request for data failed' });
    }
  }, [dashDataState, isErrorAlertsShown]);

  return (
    <>
      {isPending() && <Loading message="Loading Data" top={6} />}
      {isFailed() && <ErrorMessage>{getError()}</ErrorMessage>}
      {isCompleted() &&
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
