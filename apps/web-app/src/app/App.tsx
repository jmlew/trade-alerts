import { BrowserRouter as Router } from 'react-router-dom';

import { AlertProvider } from '@trade-alerts/shared/feature-alert';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import AppRoutes from './app.routes';

function App() {
  return (
    <CssBaseline>
      <Router>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <AlertProvider>
            <AppRoutes />
          </AlertProvider>
        </LocalizationProvider>
      </Router>
    </CssBaseline>
  );
}

export default App;
