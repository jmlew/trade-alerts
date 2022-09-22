import { Drawer } from '@mui/material';

import { useAlertUpdaterDrawerContext } from '../context/alert-updater-drawer.context';
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
  const { isDrawerOpen, setDrawerOpen } = useAlertUpdaterDrawerContext();
  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <Drawer sx={styles.root} anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
      <AlertUpdaterLayout />
    </Drawer>
  );
}
