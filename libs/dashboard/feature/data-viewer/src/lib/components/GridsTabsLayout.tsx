import { MouseEvent, ReactNode, useState } from 'react';

import { Box, Tab, Tabs } from '@mui/material';
import { BtnDownloadData } from '@trade-alerts/dashboard/ui/controls';
import { themeColors } from '@trade-alerts/shared/ui-styles';

import { GridContainer } from '../containers/GridContainer';
import { gridLabels } from '../entities/dashboard-grid.constants';
import { DashboardGrid } from '../entities/dashboard-grid.enum';

const styles = {
  root: { width: 1, color: 'primary.main', backgroundColor: themeColors.backgroundDark },
  tabs: {
    width: 1,
    backgroundColor: themeColors.backgroundDark,
    color: 'white',
    borderBottom: 1,
    borderColor: 'divider',
  },
  panel: {
    pb: 1,
  },
  header: {
    py: 0.5,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export function GridsTabsLayout() {
  const [activeGrid, setActiveGrid] = useState<DashboardGrid>(
    DashboardGrid.AlertInformation
  );

  function handleDownloadData(grid: DashboardGrid) {
    console.log('Download CSV for ', grid);
  }

  const handleChange = (event: React.SyntheticEvent, newValue: DashboardGrid) => {
    setActiveGrid(newValue);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.tabs}>
        <Tabs value={activeGrid} centered variant="fullWidth" onChange={handleChange}>
          <Tab label={gridLabels.get(DashboardGrid.AlertInformation)} />
          <Tab label={gridLabels.get(DashboardGrid.AlertedTransactions)} />
          <Tab label={gridLabels.get(DashboardGrid.AccountTransactions)} />
        </Tabs>
      </Box>
      <GridPanel
        grid={DashboardGrid.AlertInformation}
        activeGrid={activeGrid}
        onDownloadGrid={handleDownloadData}
      >
        <GridContainer grid={DashboardGrid.AlertInformation} />
      </GridPanel>
      <GridPanel
        grid={DashboardGrid.AlertedTransactions}
        activeGrid={activeGrid}
        onDownloadGrid={handleDownloadData}
      >
        <GridContainer grid={DashboardGrid.AlertedTransactions} />
      </GridPanel>
      <GridPanel
        grid={DashboardGrid.AccountTransactions}
        activeGrid={activeGrid}
        onDownloadGrid={handleDownloadData}
      >
        <GridContainer grid={DashboardGrid.AccountTransactions} />
      </GridPanel>
    </Box>
  );
}

interface GridPanelProps {
  children: ReactNode;
  grid: DashboardGrid;
  activeGrid: DashboardGrid;
  onDownloadGrid: (grid: DashboardGrid) => void;
}

function GridPanel({ children, grid, activeGrid, onDownloadGrid }: GridPanelProps) {
  function handleDownloadClick(event: MouseEvent<HTMLButtonElement>) {
    onDownloadGrid(grid);
  }

  return activeGrid === grid ? (
    <Box sx={styles.panel}>
      <Box sx={styles.header}>
        <BtnDownloadData onClick={handleDownloadClick} />
      </Box>
      {children}
    </Box>
  ) : null;
}
