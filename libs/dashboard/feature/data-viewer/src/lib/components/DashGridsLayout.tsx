import { MouseEvent, SyntheticEvent, useState } from 'react';

import { BtnDownloadData } from '@kdb-dash/dashboard/ui/controls';
import { themeColors } from '@kdb-dash/shared/ui-styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

import { DashboardGridContainer } from '../containers/DashboardGridContainer';
import { DashboardGrid } from '../enum/DashboardGrid.enum';

const styles = {
  root: { width: 1, color: 'primary.main', backgroundColor: themeColors.background },
  dashboardGrid: {
    width: 1,
    backgroundColor: themeColors.backgroundDark,
    color: 'white',
  },
  panelContent: { pt: 0 },
};

export function DashGridsLayout() {
  const [panelExpandState, setPanelExpandState] = useState({
    [DashboardGrid.AlertInformation]: false,
    [DashboardGrid.AlertedTransactions]: false,
    [DashboardGrid.AccountTransactions]: false,
  });

  function handleDownloadData(grid: DashboardGrid) {
    console.log('Download CSV for ', grid);
  }

  function handleAccordianExpandChange(panel: DashboardGrid) {
    return (event: SyntheticEvent, isExpanded: boolean) => {
      return setPanelExpandState({ ...panelExpandState, [panel]: isExpanded });
    };
  }

  return (
    <Box sx={styles.root}>
      <GridAccordian
        grid={DashboardGrid.AlertInformation}
        isExpanded={panelExpandState[DashboardGrid.AlertInformation]}
        onChange={handleAccordianExpandChange(DashboardGrid.AlertInformation)}
        onDownload={handleDownloadData}
      />
      <GridAccordian
        grid={DashboardGrid.AlertedTransactions}
        isExpanded={panelExpandState[DashboardGrid.AlertedTransactions]}
        onChange={handleAccordianExpandChange(DashboardGrid.AlertedTransactions)}
        onDownload={handleDownloadData}
      />
      <GridAccordian
        grid={DashboardGrid.AccountTransactions}
        isExpanded={panelExpandState[DashboardGrid.AccountTransactions]}
        onChange={handleAccordianExpandChange(DashboardGrid.AccountTransactions)}
        onDownload={handleDownloadData}
      />
    </Box>
  );
}

interface GridAccordianProps {
  grid: DashboardGrid;
  isExpanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
  onDownload: (grid: DashboardGrid) => void;
}

function GridAccordian({ grid, isExpanded, onChange, onDownload }: GridAccordianProps) {
  function handleDownloadClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onDownload(grid);
  }

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      sx={styles.dashboardGrid}
      onChange={onChange}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body2">{grid}</Typography>
        {isExpanded && <BtnDownloadData onClick={handleDownloadClick} />}
      </AccordionSummary>
      <AccordionDetails sx={styles.panelContent}>
        <DashboardGridContainer grid={DashboardGrid.AlertInformation} />
      </AccordionDetails>
    </Accordion>
  );
}
