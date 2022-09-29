import { Drawer } from '@mui/material';

import { useAlertUpdaterContext } from '../context/alert-updater.context';
import { AlertUpdaterLayout } from './AlertUpdaterLayout';

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

export function AlertUpdaterDrawer() {
  const { isDrawerOpen, setDrawerOpen } = useAlertUpdaterContext();
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
      <AlertUpdaterLayout />
    </Drawer>
  );
}
