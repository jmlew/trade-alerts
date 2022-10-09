import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { NotificationProvider } from '@trade-alerts/shared/feature/notification';

import AppRoutes from './app.routes';

function App() {
  return (
    <CssBaseline>
      <Router>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <NotificationProvider>
            <AppRoutes />
          </NotificationProvider>
        </LocalizationProvider>
      </Router>
    </CssBaseline>
  );
}

export default App;
