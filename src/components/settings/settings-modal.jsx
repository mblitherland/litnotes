import React from 'react';

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
            <CloseIcon />
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
