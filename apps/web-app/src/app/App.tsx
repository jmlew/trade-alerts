import { BrowserRouter as Router } from 'react-router-dom';

import { AlertProvider } from '@kdb-dash/shared/feature-alert';
import CssBaseline from '@mui/material/CssBaseline';

import AppRoutes from './app.routes';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#fafafa',
  },
};

function App() {
  return (
    <CssBaseline>
      <Router>
        <AlertProvider>
          <AppRoutes />
        </AlertProvider>
      </Router>
    </CssBaseline>
  );
}

export default App;
