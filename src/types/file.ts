export type File<T extends string = ''> = {
  fileName: string;
  type: T;
};

export type PostFile = File<'post'>;
export type ImageFile = File<'image'>;
