import React from 'react';

import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';



const WorkspaceTree = ({ workspaceTree }) => {

  React.useEffect(() => {
    console.log("In wt, workspaceTree updated");
    console.log(workspaceTree);
    Object.entries(workspaceTree).map(([key, val]) => {
      console.log("k", key, "v", val);
    });
  }, [ workspaceTree ]);

  return (
    <>
      <TreeView sx={{}}>
        <TreeItem nodeId="0" label="top" />
      </TreeView>
    </>
  )
}

export default WorkspaceTree;
