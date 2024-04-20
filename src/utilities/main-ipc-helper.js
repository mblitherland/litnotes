import { randomUUID } from 'crypto';
import { dialog } from 'electron';
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

const getSettings = (store) => {
  return store.getAll();
}

const setSettings = (store, newSettings) => {
  console.log("saving settings", JSON.stringify(newSettings));
  for (var key in ['themeName', 'lastWorkspace', 'drawer', 'workspaces', 'windowBounds', 'windowPosition']) {
    if (key in newSettings) {
      console.log("saving key", key, "value", value);
      store.set(key, newSettings[key]);
    }
  }
  store.save();
  return store.getAll();
}

export { 
  browseDirectory,
  generateUUID,
  getSettings,
  setSettings
};
