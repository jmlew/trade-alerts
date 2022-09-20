import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FiltersType, getInitialFilterType } from '@kdb-dash/dashboard/domain';
import { AlertUpdaterDrawer } from '@kdb-dash/dashboard/feature/alert-updater';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import {
  DashSelectorContainer,
  DataLoaderContainer,
  DataSelectorContainer,
} from '@kdb-dash/dashboard/feature/data-selector';
import { BtnSideExpand, FiltersTypeBtns } from '@kdb-dash/dashboard/ui/controls';
import { ApiStateManager } from '@kdb-dash/shared/data-access';
import { DividerVert } from '@kdb-dash/shared/ui-common';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const styles = {
  data: {
    height: 38,
    display: 'flex',
    justifyContent: 'space-between',
  },
  selector: {
    mx: 4,
    minWidth: 400,
  },
  spacer: {
    flexGrow: 1,
  },
};

export function DashHeaderLayout() {
  const [searchParams] = useSearchParams();
  const [filtersType, setFiltersType] = useState<FiltersType>(
    getInitialFilterType(searchParams)
  );
  const [isAlertUpdaterOpen, setAlertUpdaterOpen] = useState(false);
  const { dashDataState } = useDashboardDataContext();
  const isPending: boolean =
    dashDataState != null && ApiStateManager.isPending(dashDataState);

  useEffect(() => {
    if (isPending && isAlertUpdaterOpen) {
      setAlertUpdaterOpen(false);
    }
  }, [isPending, isAlertUpdaterOpen]);

  function handleToggleDrawer() {
    setAlertUpdaterOpen(!isAlertUpdaterOpen);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <DashSelectorContainer />
        <SectionSpacer />
        <Box sx={styles.data}>
          <FiltersTypeBtns type={filtersType} onSetType={setFiltersType} />
          <Box sx={styles.selector}>
            <DataSelectorContainer type={filtersType} />
          </Box>
          <DataLoaderContainer />
        </Box>
        <SectionSpacer />
        <BtnSideExpand
          isDisabled={isPending}
          isExpanded={isAlertUpdaterOpen}
          onClick={handleToggleDrawer}
        />
      </Toolbar>
      <AlertUpdaterDrawer isOpen={isAlertUpdaterOpen} onClose={handleToggleDrawer} />
    </AppBar>
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
