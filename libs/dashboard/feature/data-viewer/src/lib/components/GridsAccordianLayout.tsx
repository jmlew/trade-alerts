import { MouseEvent, ReactNode, SyntheticEvent, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { BtnDownloadData } from '@trade-alerts/dashboard/ui/controls';
import { dashAccordianContent, themeColors } from '@trade-alerts/shared/ui-styles';

import { GridContainer } from '../containers/GridContainer';
import { gridLabels } from '../entities/dashboard-grid.constants';
import { DashboardGrid } from '../entities/dashboard-grid.enum';

const styles = {
  root: { width: 1, color: 'primary.main', backgroundColor: themeColors.background },
  accordian: {
    width: 1,
    backgroundColor: themeColors.backgroundDark,
    color: 'white',
  },
};

interface GridShownState {
  [DashboardGrid.AlertInformation]: boolean;
  [DashboardGrid.AlertedTransactions]: boolean;
  [DashboardGrid.AccountTransactions]: boolean;
}

export function GridsAccordianLayout() {
  const [gridShownState, setGridShownState] = useState<GridShownState>({
    [DashboardGrid.AlertInformation]: false,
    [DashboardGrid.AlertedTransactions]: false,
    [DashboardGrid.AccountTransactions]: false,
  });

  function handleDownloadData(grid: DashboardGrid) {
    console.log('Download CSV for ', grid);
  }

  return (
    <Box sx={styles.root}>
      <GridAccordian
        grid={DashboardGrid.AlertInformation}
        shownState={gridShownState}
        setShownState={setGridShownState}
        onDownloadGrid={handleDownloadData}
      >
        <GridContainer grid={DashboardGrid.AlertInformation} />
      </GridAccordian>
      <GridAccordian
        grid={DashboardGrid.AlertedTransactions}
        shownState={gridShownState}
        setShownState={setGridShownState}
        onDownloadGrid={handleDownloadData}
      >
        <GridContainer grid={DashboardGrid.AlertedTransactions} />
      </GridAccordian>
      <GridAccordian
        grid={DashboardGrid.AccountTransactions}
        shownState={gridShownState}
        setShownState={setGridShownState}
        onDownloadGrid={handleDownloadData}
      >
        <GridContainer grid={DashboardGrid.AccountTransactions} />
      </GridAccordian>
    </Box>
  );
}

interface GridAccordianProps {
  children: ReactNode;
  grid: DashboardGrid;
  shownState: GridShownState;
  setShownState: (state: GridShownState) => void;
  onDownloadGrid: (grid: DashboardGrid) => void;
}

function GridAccordian({
  children,
  grid,
  shownState,
  setShownState,
  onDownloadGrid,
}: GridAccordianProps) {
  function handleChange(event: SyntheticEvent, isExpanded: boolean) {
    setShownState({ ...shownState, [grid]: isExpanded });
  }

  function handleDownloadClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onDownloadGrid(grid);
  }

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      onChange={handleChange}
      sx={styles.accordian}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body2">{gridLabels.get(grid)}</Typography>
        {shownState[grid] && <BtnDownloadData onClick={handleDownloadClick} />}
      </AccordionSummary>
      <AccordionDetails sx={dashAccordianContent}>{children}</AccordionDetails>
    </Accordion>
  );
}
