import { randomUUID } from 'crypto';
import { dialog } from 'electron';
import fs from 'fs';
import path from 'path';

const browseDirectory = async (window) => {
  const result = { success: false };
  try {
    const selected = await dialog.showOpenDialog(window, { properties: ['openDirectory'] });
    if (selected['canceled'] !== 'true') {
      const dir = selected['filePaths'][0];
      const [ name ] = dir.split(path.sep).slice(-1);
      result['dir'] = dir;
      result['name'] = name;
      result['success'] = true;
    }
  } catch (error) {
    console.error('Error on select dialog', error);
  }
  console.log('Result of directory browse.', JSON.stringify(result));
  return result;
}

const generateUUID = () => {
  return randomUUID();
};

const getDirectory = (workspaceDir) => {
  const listing = fs.readdirSync(workspaceDir, { withFileTypes: true, recursive: true });
  const tree = {};
  listing.forEach(entry => {
    if (entry.isFile() || entry.isDirectory()) {
      const relPath = path.relative(workspaceDir, entry.path);
      populateChildren(relPath, entry.name, tree);
    }
  });
  return tree;
}

const populateChildren = (relPath, name, top) => {
  const list = relPath.split(path.sep);
  var current = top;
  list.forEach(entry => {
    if (!(entry in current)) {
      // If the entry really is a directory it should have already been set
      current[entry] = { type: 'dir', children: {} };
    }
    current = current[entry];
  });
  current['children'][name] = {
    type: 'file'
  };
}

const getSettings = (store) => {
  return store.getAll();
}

const setSettings = (store, newSettings) => {
  for (var key of ['themeName', 'lastWorkspace', 'drawer', 'workspaces', 'windowBounds', 'windowPosition']) {
    if (key in newSettings) {
      store.set(key, newSettings[key]);
    }
  }
  store.save();
  return store.getAll();
}

export { 
  browseDirectory,
  generateUUID,
  getDirectory,
  getSettings,
  setSettings
};
