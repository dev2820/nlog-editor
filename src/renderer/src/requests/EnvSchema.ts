import { isNil } from '@/utils/type';

export class EnvSchema {
  static async fetchBasePath(): Promise<string | Error> {
    try {
      const result = await window.api.fetchBasePath();
      if (isNil(result)) {
        throw Error(`failed to fetch base path`);
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

  static async updateBasePath(basepath: string): Promise<true | Error> {
    try {
      window.api.setBasePath(basepath);

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        return err;
      }

      return Error(String(err));
    }
  }
}
