import { SyntheticEvent, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { dashAccordianContent, themeColors } from '@trade-alerts/shared/ui-styles';

import { OverviewContainer } from '../containers/OverviewContainer';

const styles = {
  root: { width: 1 },
  accordian: {
    width: 1,
    backgroundColor: themeColors.backgroundLight,
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
      <Accordion sx={styles.accordian} expanded={isOpen} onChange={handleToggleAccordian}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="overview-header">
          <Typography variant="body2">Alerts Overview</Typography>
        </AccordionSummary>
        <AccordionDetails sx={dashAccordianContent}>
          <OverviewContainer />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
