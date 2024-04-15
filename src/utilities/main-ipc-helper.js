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
  const result = { workspaceDir, directories: {} };
  listing.forEach(entry => {
    const relPath = path.relative(workspaceDir, entry.path);
    if (entry.isDirectory()) {
      result['directories'][relPath] = { files: [] };
    } else if (entry.isFile()) {
      const dirname = path.relative(workspaceDir, path.dirname(entry.path));
      result['directories'][dirname]['files'].push({ name: entry.name });
    }
  });
  return result;
}

// For reference this is the format of the getDirectory result:
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
