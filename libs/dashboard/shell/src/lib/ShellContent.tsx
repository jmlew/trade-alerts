import { ReactNode } from 'react';

import { themeColors } from '@kdb-dash/shared/ui-styles';
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';

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

export function ShellContent({ children }: ShellContentProps) {
  return <Box sx={styles.root}>{children}</Box>;
}
