import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './components/app.jsx';
import getTheme from './components/theme.jsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const initSettings = await window.electronAPI.getSettings();
const [ settings, setSettings ] = React.useState(initSettings);
const [ theme, setTheme ] = React.useState(initSettings['themeName']);

React.useEffect(() => {
  setTheme(settings['themeName']);
}, [ settings ]);

const updateSettings = async (newSettings) => {
  await window.electronAPI.setSettings(newSettings);
  setSettings(await window.electronAPI.getSettings);
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App
      settings={settings}
      updateSettings={updateSettings} />
  </ThemeProvider>
);
