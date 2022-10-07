import { ReactNode } from 'react';

import { Drawer } from '@mui/material';

import { useAlertManagerDrawerContext } from './context/alert-manager-drawer.context';

const yPos = 65;
const styles = {
  root: {
    top: yPos,
    '& .MuiBackdrop-root': {
      top: yPos,
    },
    '& .MuiDrawer-paper': {
      top: yPos,
    },
  },
};

interface Props {
  children: ReactNode;
}
export function AlertManagerDrawer({ children }: Props) {
  const { isDrawerOpen, setDrawerOpen } = useAlertManagerDrawerContext();
  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <Drawer
      sx={styles.root}
      anchor="right"
      open={isDrawerOpen}
      hideBackdrop={false}
      onClose={closeDrawer}
    >
      {children}
    </Drawer>
  );
}
