import { useDashboardDataContext } from '@kdb-dash/dashboard/domain';
import { DashboardGrid } from '@kdb-dash/dashboard/ui/grids';
import { alertInfoColDefs, transactionColDefs } from '@kdb-dash/dashboard/util/grid';
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
  root: { width: 1, color: 'primary.main', backgroundColor: themeColors.background },
  gridPanel: { width: 1, backgroundColor: themeColors.backgroundDark },
  grid: { width: 1 },
};

export function DashGridsLayout() {
  const { dashData } = useDashboardDataContext();
  if (!dashData) {
    return null;
  }
  console.log('dashData', dashData);
  return (
    <Box sx={styles.root}>
      {dashData.alerts != null && (
        <Accordion sx={styles.gridPanel}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="grid-1-header">
            <Typography>Alert Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DashboardGrid
              data={dashData.alerts}
              configs={alertInfoColDefs}
              sx={styles.grid}
            />
          </AccordionDetails>
        </Accordion>
      )}
      {dashData.alertsTrans != null && (
        <Accordion sx={styles.gridPanel}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="grid-2-header">
            <Typography>Alerted Transactions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DashboardGrid
              data={dashData.alertsTrans}
              configs={transactionColDefs}
              sx={styles.grid}
            />
          </AccordionDetails>
        </Accordion>
      )}
      {dashData.accountsTrans != null && (
        <Accordion sx={styles.gridPanel}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="grid-3-header">
            <Typography>Account Transactions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DashboardGrid
              data={dashData.accountsTrans}
              configs={transactionColDefs}
              sx={styles.grid}
            />
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}
