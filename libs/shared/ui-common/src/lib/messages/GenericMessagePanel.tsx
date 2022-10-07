import { ReactNode } from 'react';

import { Box } from '@mui/material';
import {
  dashItemBorderRadius,
  dashSectionBorder,
  themeColors,
} from '@trade-alerts/shared/ui-styles';

import { PanelStack } from '../../../../../shared/ui-common/src/lib/layout/PanelStack';

const styles = {
  root: { width: 1 },
  content: {
    width: 1,
    backgroundColor: themeColors.backgroundLight,
    ...dashSectionBorder,
    borderRadius: dashItemBorderRadius,
    p: 6,
  },
};

interface GenericMessagePanelProps {
  children: ReactNode;
}

export function GenericMessagePanel({ children }: GenericMessagePanelProps) {
  return (
    <Box sx={styles.root}>
      <PanelStack>
        <Box sx={styles.content}>{children}</Box>
      </PanelStack>
    </Box>
  );
}
