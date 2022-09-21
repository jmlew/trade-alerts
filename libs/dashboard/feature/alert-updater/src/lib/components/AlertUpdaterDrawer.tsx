import { Drawer } from '@mui/material';

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

interface AlertUpdaterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlertUpdaterDrawer({ isOpen, onClose }: AlertUpdaterDrawerProps) {
  return (
    <Drawer sx={styles.root} anchor="right" open={isOpen} onClose={onClose}>
      <AlertUpdaterLayout />
    </Drawer>
  );
}
