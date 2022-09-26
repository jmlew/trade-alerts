import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { DataSelectorContainer } from '@trade-alerts/dashboard/feature/data-selector';

export function DashHeaderLayout() {
  return (
    <AppBar position="static">
      <Toolbar>
        <DataSelectorContainer />
      </Toolbar>
    </AppBar>
  );
}
