import { createContext, useContext } from 'react';

type PostState = {
  targetPath: string;
};

const initialState: PostState = {
  targetPath: ''
};

export const PostContext = createContext<PostState>(initialState);

export const usePostContext = () => {
  return useContext(PostContext);
};
