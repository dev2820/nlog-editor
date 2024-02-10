import { isNil } from '@/utils/type';
import { type Post } from '@type/post';

export class PostSchema {
  static async loadPost(postId: string): Promise<Post | Error> {
    try {
      const result = await window.api.loadPost(postId);
      if (isNil(result)) {
        throw Error(`failed to load post: ${postId}`);
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
  static async createPost(postTitle: string): Promise<Post | Error> {
    try {
      const result = await window.api.createPost(postTitle);
      if (isNil(result)) {
        throw Error(`failed to create post: ${postTitle}`);
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
