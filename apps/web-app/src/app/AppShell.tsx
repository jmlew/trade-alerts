import { Outlet } from 'react-router-dom';

import { uiTheme } from '@kdb-dash/shared/ui-styles';
import { ThemeProvider } from '@mui/material/styles';

export function AppShell() {
  return (
    <ThemeProvider theme={uiTheme}>
      <Outlet />
    </ThemeProvider>
  );
}
