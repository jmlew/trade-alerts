import { ReactNode } from 'react';

import { dashItemPadding } from '@kdb-dash/shared/ui-styles';
import { Box, Stack } from '@mui/material';

import { DashChartsLayout } from './DashChartsLayout';
import { DashFooterLayout } from './DashFooterLayout';
import { DashGridsLayout } from './DashGridsLayout';
import { DashOverviewLayout } from './DashOverviewLayout';

const styles = {
  root: { width: 1 },
  panels: { width: 1, py: dashItemPadding, px: dashItemPadding },
  overview: { width: 1 },
  charts: { width: 1 },
  grids: { width: 1 },
  footer: { width: 1 },
};

export function DashLayout() {
  return (
    <Box sx={styles.root}>
      <DashStack>
        <Box sx={styles.overview}>
          <DashOverviewLayout />
        </Box>
        <Box sx={styles.charts}>
          <DashChartsLayout />
        </Box>
        <Box sx={styles.grids}>
          <DashGridsLayout />
        </Box>
      </DashStack>
      <Box sx={styles.footer}>
        <DashFooterLayout />
      </Box>
    </Box>
  );
}

function DashStack({ children }: { children: ReactNode }) {
  return (
    <Stack
      sx={styles.panels}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={dashItemPadding}
    >
      {children}
    </Stack>
  );
}
