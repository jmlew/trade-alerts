// Import MUI default Inter font: https://mui.com/components/typography/#general
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

import * as ReactDOM from 'react-dom/client';

import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
