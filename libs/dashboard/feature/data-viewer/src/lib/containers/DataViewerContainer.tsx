import { useEffect } from 'react';

import { Typography } from '@mui/material';
import { doAlertsExist } from '@trade-alerts/dashboard/domain';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';
import { useApiStateReference } from '@trade-alerts/shared/data-access';
import { useNotification } from '@trade-alerts/shared/feature/notification';
import {
  ErrorMessage,
  GenericMessagePanel,
  Loading,
} from '@trade-alerts/shared/ui-common';

import { DashLayout } from '../components/DashLayout';

interface DataViewerContainerProps {
  isErrorAlertsShown?: boolean;
}

export function DataViewerContainer({ isErrorAlertsShown }: DataViewerContainerProps) {
  const { setNotification } = useNotification();
  const { alerts, dataState } = useDashboardDataContext();
  const dashDataStateRef = useApiStateReference(dataState);
  const { isFailed, isPending, isCompleted, getError } = dashDataStateRef;

  // Show error alerts if enabled.
  useEffect(() => {
    if (!isErrorAlertsShown) {
      return;
    }
    if (isFailed()) {
      setNotification({
        isShown: true,
        message: getError() || 'Request for data failed',
      });
    }
  }, [dataState, isErrorAlertsShown]);

  return (
    <>
      {isPending() && <Loading message="Loading Data" top={6} />}
      {isFailed() && <ErrorMessage>{getError()}</ErrorMessage>}
      {isCompleted() &&
        (doAlertsExist(alerts) ? <DashLayout /> : <NoAlertsFoundMessage />)}
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
