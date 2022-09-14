import { useDashboardDataContext } from '@kdb-dash/dashboard/domain';
import { DashboardGrid } from '@kdb-dash/dashboard/ui/grids';
import { themeColors } from '@kdb-dash/shared/ui-styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

const styles = {
  root: { width: 1 },
  gridPanel: { width: 1, backgroundColor: themeColors.backgroundDark },
  grid: { width: 1, height: 400 },
};

export function DashGridsLayout() {
  const { dashData } = useDashboardDataContext();
  return (
    <Box sx={styles.root}>
      <Accordion sx={styles.gridPanel}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="grid-1-header">
          <Typography>Alert Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DashboardGrid data={dashData} sx={styles.grid} />
        </AccordionDetails>
      </Accordion>
      <Accordion sx={styles.gridPanel}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="grid-2-header">
          <Typography>Alerted Transactions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DashboardGrid data={dashData} sx={styles.grid} />
        </AccordionDetails>
      </Accordion>
      <Accordion sx={styles.gridPanel}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="grid-3-header">
          <Typography>Account Transactions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DashboardGrid data={dashData} sx={styles.grid} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
