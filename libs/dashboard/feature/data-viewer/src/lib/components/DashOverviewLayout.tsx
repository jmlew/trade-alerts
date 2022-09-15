import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
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
  overview: { width: 1, height: 200 },
};

export function DashOverviewLayout() {
  const { dashData } = useDashboardDataContext();
  return (
    <Box sx={styles.root}>
      <Accordion sx={styles.overviewPanel}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="overview-header">
          <Typography>Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={styles.overview}>
            <Typography>Overviews here</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
