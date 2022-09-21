import { Box } from '@mui/material';

import { DashChartsLayout } from './DashChartsLayout';
import { DashFooterLayout } from './DashFooterLayout';
import { DashGridsLayout } from './DashGridsLayout';
import { DashOverviewLayout } from './DashOverviewLayout';
import { DashPanelStack } from './DashPanelStack';

const styles = {
  root: { width: 1 },
  overview: { width: 1 },
  charts: { width: 1 },
  grids: { width: 1 },
  footer: { width: 1 },
};

export function DashLayout() {
  return (
    <Box sx={styles.root}>
      <DashPanelStack>
        <Box sx={styles.overview}>
          <DashOverviewLayout />
        </Box>
        <Box sx={styles.charts}>
          <DashChartsLayout />
        </Box>
        <Box sx={styles.grids}>
          <DashGridsLayout />
        </Box>
      </DashPanelStack>
      <Box sx={styles.footer}>
        <DashFooterLayout />
      </Box>
    </Box>
  );
}
