import { app, dialog, ipcMain, BrowserWindow } from 'electron';
import Store from './utilities/settings-store.js';
import { debounce } from './utilities/common.js';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const store = new Store({
  configName: 'user-settings',
  defaults: {
    themeName: 'light',
    drawer: {
      open: true,
      width: 300
    },
    windowBounds: {
      width: 1280,
      height: 840
    },
    windowPosition: {
      winX: 100,
      winY: 100
    },
    workSpaces: []
  }
});

const handleBrowseDirectory = async () => {
  // TODO: Should really catch exceptions and handle them here to the front-end
  // TODO: The showOpenDialog REALLY needs a reference to mainWindow
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  console.log(">>> Browse directory found: '"+JSON.stringify(result)+"'");
  return result;
}

const handleGetSetting = (_, key) => {
  return store.get(key);
}

const handleSetSetting = (_, key, value) => {
  store.set(key, value);
}

const createWindow = () => {
  const { width, height } = store.get('windowBounds');
  const { winX, winY } = store.get('windowPosition');

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: winX,
    y: winY,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.on('move', () => {
    const [ winX, winY ] = mainWindow.getPosition();
    debounce(store.set('windowPosition', { winX, winY }));
  });

  mainWindow.on('resize', () => {
    const { width, height } = mainWindow.getBounds();
    debounce(store.set('windowBounds', { width, height }));
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  ipcMain.handle('file:browseDirectory', handleBrowseDirectory);
  ipcMain.handle('store:getSetting', handleGetSetting);
  ipcMain.handle('store:setSetting', handleSetSetting);
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
