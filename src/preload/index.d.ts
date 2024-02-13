import { ElectronAPI } from '@electron-toolkit/preload';

import { FileInfo } from '@type/fileInfo';
import { type Post } from '@type/post';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      setTitle: (title: string) => void;
      savePost: (fileName: string, post: Post) => Promise<Post>;
      fetchBasePath: () => Promise<string>;
      setBasePath: (basePath: string) => void;
      createPost: (title: string) => Promise<Post | null>;
      fetchFileStructure: () => Promise<FileInfo<'post' | 'image'>[]>;
      loadPost: (title: string) => Promise<Post | null>;
    };
  }
}
