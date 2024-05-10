import { randomUUID } from 'crypto';
import { dialog } from 'electron';
import fs from 'fs';
import path from 'path';

const loadFile = (filePath) => {
  console.log("Loading file", filePath);
  return fs.readFileSync(filePath);
}

const saveFile = (filePath, contents) => {
  console.log("Saving file", filePath);
  fs.writeFileSync(filePath, contents);
}

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
  const tree = { type: 'workspace', path: workspaceDir, children: {} };
  listing.forEach(entry => {
    if (entry.isFile() || entry.isDirectory()) {
      populateChildren(workspaceDir, entry, tree);
    }
  });
  return tree;
}

const populateChildren = (workspaceDir, entry, top) => {
  const relPath = path.relative(workspaceDir, entry.path);
  const list = relPath.split(path.sep);
  var current = top['children'];
  var rebuild = workspaceDir;
  list.forEach(subdir => {
    if (subdir !== "") {
      rebuild = path.join(rebuild, subdir);
      // If the entry really is a directory it could have already been set
      if (!(subdir in current)) {
        current[subdir] = { type: 'dir', path: rebuild, children: {} };
      }
      current = current[subdir]['children'];
    }
  });
  if (!(entry.name in current)) {
    current[entry.name] = {
      type: entry.isFile() ? 'file' : 'dir',
      path: path.join(entry.path, entry.name),
      base: path.basename(entry.name),
      ext: path.extname(entry.name)
    };
    if (entry.isDirectory()) {
      current[entry.name]['children'] = {};
    }
  }
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
  loadFile,
  saveFile,
  setSettings
};
