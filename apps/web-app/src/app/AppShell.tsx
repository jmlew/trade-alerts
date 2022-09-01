import { Outlet } from 'react-router-dom';

import { uiTheme } from '@kdb-dash/shared/ui-common';
import { ThemeProvider } from '@mui/material/styles';

export function AppShell() {
  return (
    <ThemeProvider theme={uiTheme}>
      <Outlet />
    </ThemeProvider>
  );
}
