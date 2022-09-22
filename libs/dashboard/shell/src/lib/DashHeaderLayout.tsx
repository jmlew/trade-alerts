import { DataSelectorContainer } from '@kdb-dash/dashboard/feature/data-selector';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export function DashHeaderLayout() {
  return (
    <AppBar position="static">
      <Toolbar>
        <DataSelectorContainer />
      </Toolbar>
    </AppBar>
  );
}
