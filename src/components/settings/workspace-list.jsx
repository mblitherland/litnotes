import React from 'react';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import Delete from '@mui/icons-material/Delete';
import LibraryBooks from '@mui/icons-material/LibraryBooks';

const WorkspaceList = ({ workspaces, handleDeleteWorkspace }) => {

  return (
    <Paper sx={{ m: 2, p: 2 }}>
      <List>
        {
          Object.entries(workspaces).map(([id, workspace]) => (
            <ListItem key={id}>
              <LibraryBooks sx={{ mr: 2 }} />
              <ListItemText
                primary={workspace.name}
                secondary={workspace.directory}
                sx={{ flex: 1 }}/>
              <Button
                id="settings-delete-workspace"
                component="label"
                color="inherit"
                startIcon={<Delete />}
                onClick={() => { handleDeleteWorkspace(id) }} />
            </ListItem>
          ))
        }
      </List>
    </Paper>
  );
}

export default WorkspaceList;
