import { Drawer } from '@mui/material';

import { useAlertManagerContext } from '../context/alert-manager.context';
import { AlertManagerLayout } from './AlertManagerLayout';

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

export function AlertManagerDrawer() {
  const { isDrawerOpen, setDrawerOpen } = useAlertManagerContext();
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
      <AlertManagerLayout />
    </Drawer>
  );
}
