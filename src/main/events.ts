import fs from 'node:fs/promises';
import path from 'node:path';

import { BrowserWindow, dialog } from 'electron';
import matter from 'gray-matter';

import { FileInfo } from '@type/fileInfo';
import { Post } from '@type/post';

import store from './store';

export function handleSetTitle(evt: Electron.IpcMainEvent, title: string) {
  const webContents = evt.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  if (!win) return;

  win.setTitle(title);
}

export async function savePost(
  _: Electron.IpcMainInvokeEvent,
  fileName: string,
  post: Post
) {
  // TODO: 트라이캐치로 감싸고, 저장 가능여부 파악하기
  const basePath = (store.get('basePath') as string) ?? '';
  const postFilePath = path.resolve(basePath, `${fileName}/index.mdx`);

  try {
    await fs.writeFile(
      postFilePath,
      `${getFrontMatter(post.title, post.created, post.modified, post.slug)}
${post.content}
`.trim()
    );

    return post;
  } catch (err) {
    return null;
  }
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
  const postFilePath = path.resolve(folderPath, 'index.mdx');
  try {
    const currentDate = new Date();
    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(
      postFilePath,
      getFrontMatter(title, currentDate, currentDate, title) + getContent()
    );
    return {
      title,
      created: currentDate,
      modified: currentDate,
      slug: title,
      content: getContent()
    };
  } catch (err) {
    // err handle
    return null;
  }
}

export async function fetchFileStructure(): Promise<
  FileInfo<'post' | 'image'>[]
> {
  const basePath = (store.get('basePath') as string) ?? '';

  try {
    const fileNames = await fs.readdir(basePath);
    const fileStats = await Promise.all(
      fileNames.map((fileName: string) => {
        const filePath = path.resolve(basePath, fileName);
        return fs.lstat(filePath);
      })
    );
    const postNames = fileNames.filter((fileName, index) => {
      return fileStats[index].isDirectory() && !fileName.startsWith('.');
    });

    const files = postNames.map((postName) => {
      return {
        fileName: postName,
        type: 'post'
      } as FileInfo<'post' | 'image'>;
    });

    return files;
  } catch (err) {
    return [];
  }
}

export async function loadPost(
  _: Electron.IpcMainInvokeEvent,
  title: string
): Promise<Post | null> {
  const basePath = (store.get('basePath') as string) ?? '';
  const postPath = path.resolve(basePath, `${title}/index.mdx`);

  try {
    const postFile = await fs.readFile(postPath);
    const { data, content } = matter(postFile.toString().trim());

    return {
      title: data.title,
      created: data.created,
      modified: data.modified,
      content,
      slug: data.slug
    };
  } catch (err) {
    return null;
  }
}

export async function uploadImage(
  _: Electron.IpcMainInvokeEvent,
  targetFolder: string
): Promise<string | null> {
  const pickedState = await dialog.showOpenDialog({
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }],
    properties: ['openFile']
  });
  if (pickedState.canceled) {
    return Promise.resolve(null);
  }

  /**
   * TODO: 이미지가 이미 존재하는 경우 덮어쓸지 물어보는 알림이 필요함
   * 혹은 이미 존재하는 이미지는 넣지 못하게 하거나?
   * TODO: 이미지 이름도 정할 수 있게 할까?
   */

  const filePath = pickedState.filePaths[0];
  const { name, ext } = path.parse(filePath);
  const destPath = path.join(targetFolder, `${name}${ext}`);
  await fs.copyFile(filePath, destPath);

  return destPath;
}

const getFrontMatter = (
  title: string,
  created: Date,
  modified: Date,
  slug: string
) => {
  const frontMatter = `---
title: ${title}
created: ${created.toISOString()}
modified: ${modified.toISOString()}
slug: ${slug}
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
