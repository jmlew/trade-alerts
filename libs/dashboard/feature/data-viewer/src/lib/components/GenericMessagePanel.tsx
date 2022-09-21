import { ReactNode } from 'react';

import {
  dashItemBorderRadius,
  dashSectionBorder,
  themeColors,
} from '@kdb-dash/shared/ui-styles';
import { Box } from '@mui/material';

import { DashPanelStack } from './DashPanelStack';

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
      <DashPanelStack>
        <Box sx={styles.content}>{children}</Box>
      </DashPanelStack>
    </Box>
  );
}
