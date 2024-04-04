import React from 'react';

import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsForm from './settings-form.jsx';


const SettingsModal = ({settings, setSettings, saveSettings, handleSettingsClose, modified, setModified}) => {

  const handleSave = () => {
    saveSettings();
    handleSettingsClose();
  };

  const handleSetSettings = (newSettings) => {
    setModified(true);
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
          <Typography sx={{ display: modified ? 'block' : 'none' }}>
            (not saved)
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <SettingsForm settings={settings} setSettings={handleSetSettings} />
    </>
  )
};

export default SettingsModal;
