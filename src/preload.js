// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron/renderer';

contextBridge.exposeInMainWorld('electronAPI', {
  browseDirectory: () => ipcRenderer.invoke('file:browseDirectory'),
  generateUUID: () => ipcRenderer.invoke('util:generateUUID'),
  getDirectory: (workspaceDir) => ipcRenderer.invoke('file:getDirectory', workspaceDir),
  getSettings: () => ipcRenderer.invoke('store:getSettings'),
  loadFile: (filePath) => ipcRenderer.invoke('file:loadFile', filePath),
  saveFile: (filePath, content) => ipcRenderer.invoke('file:saveFile', filePath, content),
  setSettings: (settings) => ipcRenderer.invoke('store:setSettings', settings)
});
