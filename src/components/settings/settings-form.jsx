import React from 'react';

import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const SettingsForm = ({handleSettingsClose}) => {

  const handleSave = () => {
    handleSettingsClose();
  }

  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleSettingsClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} varient="h6" component="div">
            Settings
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
};

export default SettingsForm;
