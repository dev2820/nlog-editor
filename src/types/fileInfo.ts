export type FileInfo<T extends string = ''> = {
  fileName: string;
  type: T;
};

export type PostFileInfo = FileInfo<'post'>;
export type ImageFileInfo = FileInfo<'image'>;
