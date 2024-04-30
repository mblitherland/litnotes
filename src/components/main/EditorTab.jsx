import React from 'react';

import Tab from '@mui/material/Tab';

const EditorTab = ({ index, tabInfo }) => {
  return <Tab label={label} id={"editor-tab-"+index} />
}

export default EditorTab;
