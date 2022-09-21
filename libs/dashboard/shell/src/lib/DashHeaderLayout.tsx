import { useState } from 'react';

import { AlertUpdaterDrawer } from '@kdb-dash/dashboard/feature/alert-updater';
import { DataSelectorContainer } from '@kdb-dash/dashboard/feature/data-selector';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export function DashHeaderLayout() {
  const [isAlertUpdaterOpen, setAlertUpdaterOpen] = useState(false);

  function closeAlertUpdater() {
    setAlertUpdaterOpen(false);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <DataSelectorContainer
          onOpenAlertUpdater={setAlertUpdaterOpen}
          isAlertUpdaterOpen={isAlertUpdaterOpen}
        />
      </Toolbar>
      <AlertUpdaterDrawer isOpen={isAlertUpdaterOpen} onClose={closeAlertUpdater} />
    </AppBar>
  );
}
