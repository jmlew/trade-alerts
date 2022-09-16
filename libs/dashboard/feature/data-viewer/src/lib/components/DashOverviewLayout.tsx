import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { JsonViewer } from '@kdb-dash/shared/ui-common';
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
  overviewPanel: {
    width: 1,
    backgroundColor: themeColors.backgroundLight,
    color: 'primary.main',
  },
  overview: { width: 1, height: 200, overflow: 'hidden' },
};

export function DashOverviewLayout() {
  const { dashData } = useDashboardDataContext();
  if (dashData == null) {
    return null;
  }
  const { alerts } = dashData;
  return (
    <Box sx={styles.root}>
      <Accordion sx={styles.overviewPanel}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="overview-header">
          <Typography>Alerts Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={styles.overview}>
            <JsonViewer data={alerts} sx={{ width: 0.8 }} />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
