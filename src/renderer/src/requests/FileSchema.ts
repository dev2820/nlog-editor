import { isNil } from '@/utils/type';
import { FileInfo } from '@type/fileInfo';

export class FileSchema {
  static async fetchFileStructure(): Promise<
    FileInfo<'post' | 'image'>[] | Error
  > {
    try {
      const result = await window.api.fetchFileStructure();
      if (isNil(result)) {
        throw Error(`failed to fetch file structure`);
      }

      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        return err;
      }

      return Error(String(err));
    }
  }
}
