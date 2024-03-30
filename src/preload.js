// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron/renderer';

console.log("Setting up IPC");
contextBridge.exposeInMainWorld('electronAPI', {
  getSetting: () => ipcRenderer.invoke('store:getSetting')
});
