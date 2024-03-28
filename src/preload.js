// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron/renderer';

contextBridge.exposeInMainWorld('electronAPI', {
  browseDirectory: () => ipcRenderer.invoke('file:browseDirectory'),
  getSetting: (key) => ipcRenderer.invoke('store:getSetting', key),
  setSetting: (key, value) => ipcRenderer.invoke('store:setSetting', key, value)
});
