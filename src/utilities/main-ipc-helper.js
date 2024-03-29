import { randomUUID } from 'crypto';
import { dialog } from 'electron';
import path from 'path';

const browseDirectory = async (window) => {
  // TODO: I think I may want to handle exceptions here and send that as an error to the front end
  // TODO: result['canceled'] === 'true' should be handled too
  const result = await dialog.showOpenDialog(window, { properties: ['openDirectory'] });
  console.log(">>> Browse directory found: '"+JSON.stringify(result)+"'");
  const dir = result['filePaths'][0];
  const [ name ] = dir.split(path.sep).slice(-1);
  return { dir, name };
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
