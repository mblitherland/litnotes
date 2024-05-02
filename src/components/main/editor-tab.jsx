import React from 'react';

import Tab from '@mui/material/Tab';

const EditorTab = ({ index, tabLabel }) => {
  return <Tab label={tabLabel} id={"editor-tab-"+index} />
}

export default EditorTab;
