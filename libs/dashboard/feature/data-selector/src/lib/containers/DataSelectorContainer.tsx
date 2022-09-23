import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  FiltersType,
  doAlertsExist,
  getInitialFilterTypeFromSearchParams,
} from '@kdb-dash/dashboard/domain';
import { useAlertUpdaterDrawerContext } from '@kdb-dash/dashboard/feature/alert-updater';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { BtnSideExpand, FiltersTypeBtns } from '@kdb-dash/dashboard/ui/controls';
import { ApiStateManager } from '@kdb-dash/shared/data-access';
import { DividerVert } from '@kdb-dash/shared/ui-common';
import { Box } from '@mui/material';

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

const { isPending, isCompleted } = ApiStateManager;

export function DataSelectorContainer() {
  const [searchParams] = useSearchParams();
  const [filtersType, setFiltersType] = useState<FiltersType>(
    getInitialFilterTypeFromSearchParams(searchParams)
  );
  const { dashData, dashDataState } = useDashboardDataContext();
  const { isDrawerOpen, setDrawerOpen } = useAlertUpdaterDrawerContext();

  const isDataPending: boolean = dashDataState != null && isPending(dashDataState);
  const isAlertsAvailable: boolean =
    dashDataState != null &&
    dashData != null &&
    isCompleted(dashDataState) &&
    doAlertsExist(dashData);

  useEffect(() => {
    if (isDataPending && isDrawerOpen) {
      setDrawerOpen(false);
    }
  }, [isDataPending, isDrawerOpen]);

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
