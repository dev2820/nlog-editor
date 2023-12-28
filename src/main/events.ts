import fs from 'node:fs/promises';

import { BrowserWindow } from 'electron';

export function handleSetTitle(evt: Electron.IpcMainEvent, title: string) {
  const webContents = evt.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  if (!win) return;

  win.setTitle(title);
}

export async function handleUpdateFile(
  _: Electron.IpcMainEvent,
  filePath: string,
  content: string
) {
  fs.writeFile(filePath, content);
}
