import fs from 'node:fs/promises';
import path from 'node:path';

import { BrowserWindow } from 'electron';

import store from './store';

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
  // TODO: 트라이캐치로 감싸고, 저장 가능여부 파악하기
  const basePath = (store.get('basePath') as string) ?? '';
  fs.appendFile(path.resolve(basePath, `${filePath}.md`), content);
}

export function getBasePath() {
  return store.get('basePath') ?? '';
}

export function handleUpdateBasePath(
  _: Electron.IpcMainEvent,
  basePath: string
) {
  store.set('basePath', basePath);
}
