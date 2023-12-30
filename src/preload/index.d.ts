import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      setTitle: (title: string) => void;
      updateFile: (filePath: string, content: string) => void;
      fetchBasePath: () => Promise<string>;
      setBasePath: (basePath: string) => void;
    };
  }
}
