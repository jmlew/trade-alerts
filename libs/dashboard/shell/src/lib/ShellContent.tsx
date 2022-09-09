import { ReactNode } from 'react';

import { Theme } from '@mui/material';
import Box from '@mui/material/Box';

const styles = {
  root: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    pt: 2,
    px: 2,
  }),
};

interface ShellContentProps {
  children: ReactNode;
}

export function ShellContent({ children }: ShellContentProps) {
  return <Box sx={styles.root}>{children}</Box>;
}
