import fs from 'node:fs/promises';
import path from 'node:path';

import { BrowserWindow } from 'electron';

import { type File } from '@type/file';
import { Post } from '@type/post';

import store from './store';

export function handleSetTitle(evt: Electron.IpcMainEvent, title: string) {
  const webContents = evt.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  if (!win) return;

  win.setTitle(title);
}

export async function handleUpdateFile(
  _: Electron.IpcMainEvent,
  fileName: string,
  post: Post
) {
  // TODO: 트라이캐치로 감싸고, 저장 가능여부 파악하기
  const basePath = (store.get('basePath') as string) ?? '';
  const postFilePath = path.resolve(basePath, `./${fileName}/index.md`);

  fs.writeFile(
    postFilePath,
    `
${getFrontMatter(post.title, post.created)}
${post.content}
`
  );
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
  const postFilePath = path.resolve(folderPath, 'index.md');
  try {
    const currentDate = new Date();
    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(
      postFilePath,
      getFrontMatter(title, currentDate) + getContent()
    );
    return {
      title,
      created: currentDate,
      content: getContent()
    };
  } catch (err) {
    // err handle
    return null;
  }
}

export async function fetchFileStructure(): Promise<File<'post' | 'image'>[]> {
  const basePath = (store.get('basePath') as string) ?? '';

  try {
    const fileNames = await fs.readdir(basePath);
    const fileStats = await Promise.all(
      fileNames.map((fileName) => {
        const filePath = path.resolve(basePath, fileName);
        return fs.lstat(filePath);
      })
    );
    const postNames = fileNames.filter((_, index) => {
      return fileStats[index].isDirectory();
    });

    const files = postNames.map((postName) => {
      return {
        fileName: postName,
        type: 'post'
      } as File<'post' | 'image'>;
    });

    return files;
  } catch (err) {
    return [];
  }
}

const getFrontMatter = (title: string, created: Date) => {
  const frontMatter = `
---
title: ${title}
created: ${created.toISOString()}
---
  `;

  return frontMatter;
};
const getContent = () => {
  const template = `
## What's New
`;

  return template;
};
