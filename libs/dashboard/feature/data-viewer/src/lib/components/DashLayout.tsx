import { Box } from '@mui/material';

import { ChartsLayout } from './ChartsLayout';
import { DashPanelStack } from './DashPanelStack';
import { FooterLayout } from './FooterLayout';
import { GridsLayout } from './GridsLayout';
import { OverviewLayout } from './OverviewLayout';

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
          <OverviewLayout />
        </Box>
        <Box sx={styles.charts}>
          <ChartsLayout />
        </Box>
        <Box sx={styles.grids}>
          <GridsLayout />
        </Box>
      </DashPanelStack>
      <Box sx={styles.footer}>
        <FooterLayout />
      </Box>
    </Box>
  );
}
