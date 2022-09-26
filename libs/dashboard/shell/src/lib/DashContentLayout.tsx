import { ReactNode } from 'react';

import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { themeColors } from '@trade-alerts/shared/ui-styles';

const styles = {
  root: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: themeColors.backgroundDark,
  }),
};

interface ShellContentProps {
  children: ReactNode;
}

export function DashContentLayout({ children }: ShellContentProps) {
  return <Box sx={styles.root}>{children}</Box>;
}
