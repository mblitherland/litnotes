import { app, ipcMain, BrowserWindow } from 'electron';
import Store from './utilities/settings-store.js';
import { debounce } from './utilities/common.js';
import { browseDirectory, generateUUID, getSettings, setSettings } from './utilities/main-ipc-helper.js';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const store = new Store({
  configName: 'user-settings',
  defaults: {
    themeName: 'light',
    lastWorkspace: '',
    drawer: {
      open: true,
      width: 320
    },
    windowBounds: {
      width: 1280,
      height: 840
    },
    windowPosition: {
      winX: 100,
      winY: 100
    },
    workspaces: {}
  }
});

var mainWindow;

const handleBrowseDirectory = async () => {
  return await browseDirectory(mainWindow);
}

const handleGetSettings = async () => {
  return getSettings(store);
}

const handleSetSettings = async (_event, settings) => {
  return setSettings(store, settings);
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
  // TODO: This could be a config setting
  mainWindow.webContents.openDevTools();
  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  ipcMain.handle('file:browseDirectory', handleBrowseDirectory);
  ipcMain.handle('store:getSettings', handleGetSettings);
  ipcMain.handle('store:setSettings', handleSetSettings);
  ipcMain.handle('util:generateUUID', generateUUID);
  mainWindow = createWindow();
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
