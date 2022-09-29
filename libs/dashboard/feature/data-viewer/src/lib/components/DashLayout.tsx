import { useSearchParams } from 'react-router-dom';

import { Box } from '@mui/material';
import { DashPanelStack } from '@trade-alerts/dashboard/ui/common';

import { ChartsLayout } from './ChartsLayout';
import { FooterLayout } from './FooterLayout';
import { GridsAccordianLayout } from './GridsAccordianLayout';
import { GridsTabsLayout } from './GridsTabsLayout';
import { OverviewLayout } from './OverviewLayout';

const styles = {
  root: { width: 1 },
  overview: { width: 1 },
  charts: { width: 1 },
  grids: { width: 1 },
  footer: { width: 1 },
};

enum GridStyle {
  Tabs = 'tabs',
  Panel = 'accordian',
}

export function DashLayout() {
  const [searchParams] = useSearchParams();
  const style: GridStyle | null = searchParams.get('style') as GridStyle;
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
          {style === GridStyle.Tabs ? <GridsTabsLayout /> : <GridsAccordianLayout />}
        </Box>
      </DashPanelStack>
      <Box sx={styles.footer}>
        <FooterLayout />
      </Box>
    </Box>
  );
}
