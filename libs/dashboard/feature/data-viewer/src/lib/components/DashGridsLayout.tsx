import {
  DashboardDataGridField,
  alertInfoConfigs,
  transactionConfigs,
} from '@kdb-dash/dashboard/domain';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { DashboardGridMui } from '@kdb-dash/dashboard/ui/grids';
import { themeColors } from '@kdb-dash/shared/ui-styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

import { getTransactionConfigsMui } from '../utils/dashboard-grid-configs.utils';
import { normaliseMuiGridData } from '../utils/dashboard-grid-data.util';

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
  const { alerts, alertsTrans, accountsTrans } = dashData;

  return (
    <Box sx={styles.root}>
      {alerts != null && (
        <Accordion sx={styles.gridPanel}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="grid-1-header">
            <Typography>Alert Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DashboardGridMui
              data={normaliseMuiGridData<DashboardDataGridField>(alerts)}
              configs={getTransactionConfigsMui(alertInfoConfigs)}
              sx={styles.grid}
            />
          </AccordionDetails>
        </Accordion>
      )}
      {alertsTrans != null && (
        <Accordion sx={styles.gridPanel}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="grid-2-header">
            <Typography>Alerted Transactions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DashboardGridMui
              data={normaliseMuiGridData<DashboardDataGridField>(alertsTrans)}
              configs={getTransactionConfigsMui(transactionConfigs)}
              sx={styles.grid}
            />
          </AccordionDetails>
        </Accordion>
      )}
      {accountsTrans != null && (
        <Accordion sx={styles.gridPanel}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="grid-3-header">
            <Typography>Account Transactions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DashboardGridMui
              data={normaliseMuiGridData<DashboardDataGridField>(accountsTrans)}
              configs={getTransactionConfigsMui(transactionConfigs)}
              sx={styles.grid}
            />
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}
