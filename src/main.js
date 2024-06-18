import { app, ipcMain, BrowserWindow } from 'electron';
import Store from './utilities/settings-store.js';
import { debounce } from './utilities/common.js';
import {
  browseDirectory,
  generateUUID,
  getDirectory,
  getSettings,
  loadFile,
  saveFile,
  setSettings
} from './utilities/main-ipc-helper.js';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const defaultConfig = {
  configName: 'user-settings',
  defaults: {
    themeName: 'light',
    showDevConsole: false,
    lastWorkspace: '',
    drawer: {
      open: true,
      width: 320,
      side: 'left'
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
};

const store = new Store(defaultConfig);

var mainWindow;

const handleBrowseDirectory = async () => {
  return await browseDirectory(mainWindow);
}

const handleGetDirectory = (_event, workspaceDir) => {
  return getDirectory(workspaceDir);
}

const handleGetSettings = async () => {
  return getSettings(store);
}

const handleLoadFile = (_event, filePath) => {
  return loadFile(filePath);
}

const handleSaveFile = (_event, filePath, content) => {
  saveFile(filePath, content);
}

const handleSetSettings = async (_event, settings) => {
  return setSettings(store, settings);
}

const debounceSave = debounce(() => {
  store.save();
}, 3000);

const createWindow = () => {
  const { width, height } = store.get('windowBounds');
  const { winX, winY } = store.get('windowPosition');
  const showDevConsole = store.get('showDevConsole');

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
    store.set('windowPosition', { winX, winY });
    debounceSave();
  });

  mainWindow.on('resize', () => {
    const { width, height } = mainWindow.getBounds();
    store.set('windowBounds', { width, height });
    debounceSave();
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (showDevConsole) {
    mainWindow.webContents.openDevTools();
  }
  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  ipcMain.handle('file:browseDirectory', handleBrowseDirectory);
  ipcMain.handle('util:generateUUID', generateUUID);
  ipcMain.handle('file:getDirectory', handleGetDirectory);
  ipcMain.handle('file:loadFile', handleLoadFile);
  ipcMain.handle('file:saveFile', handleSaveFile);
  ipcMain.handle('store:getSettings', handleGetSettings);
  ipcMain.handle('store:setSettings', handleSetSettings);
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
