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
    ipcRenderer.send('update-file', filePath, content);
  },
  fetchBasePath: () => {
    return ipcRenderer.invoke('fetch-base-path');
  },
  setBasePath: (basePath: string) => {
    ipcRenderer.send('set-base-path', basePath);
  },
  createPost: (title: string) => {
    return ipcRenderer.invoke('create-post', title);
  },
  fetchFileStructure() {
    return ipcRenderer.invoke('fetch-file-structure');
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
