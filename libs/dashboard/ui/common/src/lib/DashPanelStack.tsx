import { ReactNode } from 'react';

import { Stack } from '@mui/material';
import { dashItemPadding } from '@trade-alerts/shared/ui-styles';

const styles = {
  root: { width: 1, py: dashItemPadding, px: dashItemPadding },
};

export function DashPanelStack({ children }: { children: ReactNode }) {
  return (
    <Stack
      sx={styles.root}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={dashItemPadding}
    >
      {children}
    </Stack>
  );
}
