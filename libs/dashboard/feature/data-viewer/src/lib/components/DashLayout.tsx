import { ReactNode } from 'react';

import {
  dashItemPadding,
  dashSectionBorder,
  themeColors,
} from '@kdb-dash/shared/ui-styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';

import { DashGridsLayout } from './DashGridsLayout';

const sectionContainer = {
  width: 1,
  color: 'primary.main',
  backgroundColor: themeColors.background,
};

const styles = {
  root: { width: 1 },
  overviewPanel: { width: 1, backgroundColor: themeColors.backgroundLight },
  overview: { height: 122 },
  charts: { ...sectionContainer, ...dashSectionBorder, height: 260, padding: 2 },
  grids: { ...sectionContainer, height: 300 },
  footer: { width: 1, height: 68 },
};

export function DashLayout() {
  return (
    <Box sx={styles.root}>
      <DashStack>
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
        <Box sx={styles.charts}>
          <Typography>Charts here</Typography>
        </Box>
        <Box sx={styles.grids}>
          <DashGridsLayout />
        </Box>
        {/* <Box sx={styles.footer}> (footer) </Box> */}
      </DashStack>
    </Box>
  );
}

function DashStack({ children }: { children: ReactNode }) {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={dashItemPadding}
    >
      {children}
    </Stack>
  );
}
