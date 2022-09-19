import { SyntheticEvent, useState } from 'react';

import { AlertOverviewInfo } from '@kdb-dash/dashboard/domain';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { AlertOverviews } from '@kdb-dash/dashboard/ui/details';
import { themeColors } from '@kdb-dash/shared/ui-styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

import { getAlertOverviews } from '../utils/dashboard-overview-data.util';

const styles = {
  root: { width: 1 },
  panel: {
    width: 1,
    backgroundColor: themeColors.backgroundLight,
    color: 'primary.main',
  },
  panelContent: {
    padding: '8px',
  },
};

export function DashOverviewLayout() {
  const { dashData } = useDashboardDataContext();
  const [isOpen, setOpen] = useState(true);

  function handleToggleAccordian(event: SyntheticEvent) {
    setOpen(!isOpen);
  }

  if (dashData == null) {
    return null;
  }

  const { alerts } = dashData;
  const overviews: AlertOverviewInfo[] = getAlertOverviews(alerts);
  return (
    <Box sx={styles.root}>
      <Accordion sx={styles.panel} expanded={isOpen} onChange={handleToggleAccordian}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="overview-header">
          <Typography>Alerts Overview</Typography>
        </AccordionSummary>
        <AccordionDetails sx={styles.panelContent}>
          <AlertOverviews overviews={overviews} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
