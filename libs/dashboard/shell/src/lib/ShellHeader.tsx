import { DashSelectorContainer } from '@kdb-dash/dashboard/feature/dash-selector';
import { DataSelectorContainer } from '@kdb-dash/dashboard/feature/data-selector';
import { DividerVert } from '@kdb-dash/shared/ui-common';
import { ExpandCircleDownOutlined, Menu } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function ShellHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton> */}
        <DashSelectorContainer />
        <DividerVert />
        <div style={{ flexGrow: 1 }}></div>
        <DataSelectorContainer />
        <div style={{ flexGrow: 1 }}></div>
        <DividerVert />
        <IconButton edge="end" color="primary" aria-label="update-alert" sx={{ ml: 2 }}>
          <ExpandCircleDownOutlined sx={{ transform: 'rotate(90deg)' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
