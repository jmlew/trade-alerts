import { uiTheme } from '@kdb-dash/shared/ui-common';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

const StylesDecorator = (storyFn) => (
  <ThemeProvider theme={uiTheme}>
    <CssBaseline>{storyFn()}</CssBaseline>
  </ThemeProvider>
);

const PaddedDecorator = (storyFn) => <div style={{ padding: '10px' }}>{storyFn()}</div>;

export { StylesDecorator, PaddedDecorator };
