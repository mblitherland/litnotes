import React from 'react';

import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

// TODO: I'd like custom icons for folders and markdown files
// import Edit from '@mui/icons-material/Edit';
// import Folder from '@mui/icons-material/Folder';

const WorkspaceTree = ({ workspaceTree }) => {

  const nodeIndexes = [];

  const DirNode = ({ name, subtree }) => {
    var length = nodeIndexes.push(subtree['path']);

    return (
      <TreeItem itemId={(length - 1).toString()} label={name}>
        {
          Object.entries(subtree['children']).map(([name, node]) =>
            <Node key={name} name={name} node={node} />
          )
        }
      </TreeItem>
    );
  };

  const FileNode = ({ name, node }) => {
    var length = nodeIndexes.push(node['path']);
    return <TreeItem itemId={(length - 1).toString()} label={name} />;
  }

  const Node = ({ name, node }) => {
    if (!('type' in node)) {
      return;
    }
    if (node['type'] === 'file') {
      return <FileNode name={name} node={node} />;
    }
    if (node['type'] === 'dir' || node['type'] === 'workspace') {
      return <DirNode name={name} subtree={node} />;
    }
  }

  return (
    <>
      <TreeView sx={{}}>
        <Node name="Workspace" node={workspaceTree} />
      </TreeView>
    </>
  )
}

export default WorkspaceTree;
