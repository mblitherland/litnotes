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

const getSetting = (store, _, key) => {
  return store.get(key);
}

const setSetting = (store, _, key, value) => {
  console.log(">>> Saving user settings for: '"+key+"'");
  store.set(key, value);
}


export { 
  browseDirectory,
  generateUUID,
  getSetting,
  setSetting
};
