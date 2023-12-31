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
  const postFilePath = path.resolve(basePath, `${filePath}/${filePath}.md`);

  fs.appendFile(postFilePath, content);
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

export async function createPost(
  _: Electron.IpcMainInvokeEvent,
  title: string
) {
  const basePath = (store.get('basePath') as string) ?? '';
  const folderPath = path.resolve(basePath, title);
  const postFilePath = path.resolve(folderPath, `${title}.md`);
  try {
    const currentDate = new Date();
    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(
      postFilePath,
      `---
title: ${title}
created: ${currentDate.toISOString()}
---

## What's New
    `
    );
    return {
      title,
      created: currentDate,
      content: `
## What's New
      `
    };
  } catch (err) {
    // err handle
    return null;
  }
}
