import React from 'react';

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Close from '@mui/icons-material/Close';
import SettingsForm from './settings-form.jsx';


const SettingsModal = ({settings, setSettings, saveSettings, handleSettingsClose }) => {

  const handleSetSettings = (newSettings) => {
    saveSettings();
    setSettings(newSettings);
  };

  return (
    <>
      <AppBar 
        color="inherit"
        sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleSettingsClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <SettingsForm settings={settings} setSettings={handleSetSettings} />
    </>
  )
};

export default SettingsModal;
