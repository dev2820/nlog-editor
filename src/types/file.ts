export type File<T extends string = ''> = {
  fileName: string;
  created: Date;
  type: keyof T;
  children: File<T>[];
};

export type PostFile = File<'post'>;
export type ImageFile = File<'image'>;
