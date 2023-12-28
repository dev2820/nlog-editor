import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';

ipcRenderer.on('pong', (_event, args) => {
  console.log(args);
});

const api = {
  setTitle: (title: string) => {
    ipcRenderer.send('set-title', title);
  },
  updateFile: (filePath: string, content: string) => {
    console.log(filePath, content);
    ipcRenderer.send('update-file', filePath, content);
  }
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
