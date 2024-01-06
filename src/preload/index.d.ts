import { ElectronAPI } from '@electron-toolkit/preload';

import { type File } from '@type/file';
import { type Post } from '@type/post';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      setTitle: (title: string) => void;
      updateFile: (filePath: string, content: string) => void;
      fetchBasePath: () => Promise<string>;
      setBasePath: (basePath: string) => void;
      createPost: (title: string) => Promise<Post | null>;
      fetchFileStructure: () => Promise<File>;
    };
  }
}
