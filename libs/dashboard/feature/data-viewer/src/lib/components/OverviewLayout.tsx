import { SyntheticEvent, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { themeColors } from '@trade-alerts/shared/ui-styles';

import { OverviewContainer } from '../containers/OverviewContainer';

const styles = {
  root: { width: 1 },
  panel: {
    width: 1,
    backgroundColor: themeColors.backgroundLight,
    color: 'white',
  },
  panelContent: {
    padding: '8px',
    color: 'white',
  },
};

export function OverviewLayout() {
  const [isOpen, setOpen] = useState(true);

  function handleToggleAccordian(event: SyntheticEvent) {
    setOpen(!isOpen);
  }

  return (
    <Box sx={styles.root}>
      <Accordion sx={styles.panel} expanded={isOpen} onChange={handleToggleAccordian}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="overview-header">
          <Typography variant="body2">Alerts Overview</Typography>
        </AccordionSummary>
        <AccordionDetails sx={styles.panelContent}>
          <OverviewContainer />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
