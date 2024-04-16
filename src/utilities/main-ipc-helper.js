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
    console.error("Error on select dialog", error);
  }
  console.log(">>> Result of directory browse: '"+JSON.stringify(result)+"'");
  return result;
}

const generateUUID = () => {
  return randomUUID();
};

const getDirectory = (workspaceDir) => {
  const listing = fs.readdirSync(workspaceDir, { withFileTypes: true, recursive: true });
  const result = { workspaceDir, directories: { '': { files: [] }} };
  console.log('workspaceDir', workspaceDir);
  listing.forEach(entry => {
    const relPath = path.relative(workspaceDir, entry.path);
    if (entry.isFile()) {
      if (!(relPath in result['directories'])) {
        result['directories'][relPath] = { files: [] };
      }
      console.log('paths 1', workspaceDir, ',', entry.path, ',', relPath);
      result['directories'][relPath]['files'].push({ name: entry.name });
    }
  });
  console.log("result", result);
  return result;
}

// For reference this is the format of the getDirectory result:
// I'm not at all convinced this is a good way to do it, fwiw, storing it as a
// tree structure will more closely follow how the mui treeview is going to
// handle it.
//
// const sample_result = {
//   "workspaceDir": "<path>",
//   "directories": {
//     "/<relative path>/": {
//       "files": [
//         { "name": "<file name>" }
//       ]
//     }
//   }
// };

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
