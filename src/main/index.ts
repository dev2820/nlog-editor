import { join } from 'path';

import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { app, shell, BrowserWindow, ipcMain } from 'electron';

import {
  handleSetTitle,
  handleUpdateFile,
  getBasePath,
  handleUpdateBasePath,
  createPost
} from './events';
import store from './store';

function createWindow(): void {
  const size = store.get('windowSize') as { width: number; height: number };

  const mainWindow = new BrowserWindow({
    width: size.width || 900,
    height: size.height || 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('resize', () => {
    const { width, height } = mainWindow.getBounds();
    store.set('windowSize', { width, height });
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('set-title', handleSetTitle);
  ipcMain.on('update-file', handleUpdateFile);
  ipcMain.on('set-base-path', handleUpdateBasePath);
  ipcMain.handle('fetch-base-path', getBasePath);
  ipcMain.handle('create-post', createPost);

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
