import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Box } from '@mui/material';
import { doAlertsExist } from '@trade-alerts/dashboard/domain';
import { useAlertManagerDrawerContext } from '@trade-alerts/dashboard/feature/alert-manager-drawer';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';
import { BtnSideExpand, FiltersTypeBtns } from '@trade-alerts/dashboard/ui/controls';
import { useApiStateReference } from '@trade-alerts/shared/data-access';
import { DividerVert } from '@trade-alerts/shared/ui-common';
import {
  FiltersType,
  getInitialFilterTypeFromSearchParams,
} from '@trade-alerts/shared/util-filters';

import { DashboardSelectorContainer } from './DashboardSelectorContainer';
import { DataFiltersContainer } from './DataFiltersContainer';
import { DataLoaderContainer } from './DataLoaderContainer';

const styles = {
  data: {
    height: 38,
    display: 'flex',
    justifyContent: 'space-between',
  },
  dashSelector: {
    width: '25%',
    minWidth: 200,
  },
  filterInputs: {
    mx: 4,
    minWidth: 400,
  },
  spacer: {
    flexGrow: 1,
  },
};

export function DataSelectorContainer() {
  const [searchParams] = useSearchParams();
  const [filtersType, setFiltersType] = useState<FiltersType>(
    getInitialFilterTypeFromSearchParams(searchParams)
  );
  const { isDrawerOpen, setDrawerOpen } = useAlertManagerDrawerContext();
  const { alerts, dataState } = useDashboardDataContext();
  const dashDataStateRef = useApiStateReference(dataState);

  const isAlertsAvailable: boolean =
    dataState != null && dashDataStateRef.isCompleted() && doAlertsExist(alerts);

  useEffect(() => {
    if (dashDataStateRef.isPending() && isDrawerOpen) {
      setDrawerOpen(false);
    }
  }, [dashDataStateRef, isDrawerOpen]);

  function toggleAlertUpdater() {
    setDrawerOpen(!isDrawerOpen);
  }

  return (
    <>
      <Box sx={styles.dashSelector}>
        <DashboardSelectorContainer />
      </Box>
      <SectionSpacer />
      <DataFilters filtersType={filtersType} setFiltersType={setFiltersType} />
      <SectionSpacer />
      <BtnSideExpand
        isDisabled={!isAlertsAvailable}
        isExpanded={isDrawerOpen}
        onClick={toggleAlertUpdater}
      />
    </>
  );
}

interface DataFiltersProps {
  filtersType: FiltersType;
  setFiltersType: (filtersType: FiltersType) => void;
}

function DataFilters({ filtersType, setFiltersType }: DataFiltersProps) {
  return (
    <Box sx={styles.data}>
      <FiltersTypeBtns type={filtersType} onSetType={setFiltersType} />
      <Box sx={styles.filterInputs}>
        <DataFiltersContainer type={filtersType} />
      </Box>
      <DataLoaderContainer />
    </Box>
  );
}

function SectionSpacer() {
  return (
    <>
      <Box sx={styles.spacer} />
      <DividerVert />
      <Box sx={styles.spacer} />
    </>
  );
}
