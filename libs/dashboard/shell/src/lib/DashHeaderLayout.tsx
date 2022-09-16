import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FiltersType, getInitialFilterType } from '@kdb-dash/dashboard/domain';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import {
  DashSelectorContainer,
  DataLoaderContainer,
  DataSelectorContainer,
} from '@kdb-dash/dashboard/feature/data-selector';
import { FiltersTypeBtns } from '@kdb-dash/dashboard/ui/controls';
import { ApiStateManager } from '@kdb-dash/shared/data-access';
import { DividerVert } from '@kdb-dash/shared/ui-common';
import { ExpandCircleDownOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
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
  const [type, setType] = useState<FiltersType>(getInitialFilterType(searchParams));
  // TODO: Remove context dependancy and add to container which handles showing the side
  // panel and alert update containers.
  const { dashDataState } = useDashboardDataContext();
  const isPending: boolean =
    dashDataState != null && ApiStateManager.isPending(dashDataState);
  return (
    <AppBar position="static">
      <Toolbar>
        <DashSelectorContainer />
        <SectionSpacer />
        <Box sx={styles.data}>
          <FiltersTypeBtns type={type} onSetType={setType} />
          <Box sx={styles.selector}>
            <DataSelectorContainer type={type} />
          </Box>
          <DataLoaderContainer />
        </Box>
        <SectionSpacer />
        <IconButton
          disabled={isPending}
          edge="end"
          color="primary"
          aria-label="update-alert"
          sx={{ ml: 2 }}
        >
          <ExpandCircleDownOutlined sx={{ transform: 'rotate(90deg)' }} />
        </IconButton>
      </Toolbar>
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
