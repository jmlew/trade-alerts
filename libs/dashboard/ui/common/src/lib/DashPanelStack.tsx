import { ReactNode } from 'react';

import { dashItemPadding } from '@kdb-dash/shared/ui-styles';
import { Stack } from '@mui/material';

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
