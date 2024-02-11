import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Button, Flex, Input, NavLink } from '@/components/Common';
import { EnvSchema } from '@/requests/EnvSchema';
import { FileSchema } from '@/requests/FileSchema';
import { PostSchema } from '@/requests/PostSchema';
import { isError, isNil } from '@/utils/type';
import { css, cx } from '@style/css';
import { type File } from '@type/file';
import { type Post } from '@type/post';

import {
  PostEditor,
  type Reference as PostEditorReference
} from './components/PostEditor';

const initPost = {
  title: '',
  created: new Date(),
  modified: new Date(),
  content: '',
  slug: ''
};

export function PostEditorPage() {
  const { id } = useParams();
  const [newPostTitle, setNewPostTitle] = useState('');
  const [post, setPost] = useState<Post>(initPost);
  const [files, setFiles] = useState<File<'post' | 'image'>[]>([]);
  const editorRef = useRef<PostEditorReference>(null);
  const [postPath, setPostPath] = useState<string>('');

  function handleNewPostTitleChange(evt: ChangeEvent<HTMLInputElement>) {
    const title = evt.target.value;
    setNewPostTitle(title);
  }

  async function handleCreateNewPost() {
    const newPost = await PostSchema.createPost(newPostTitle);
    if (isError(newPost)) return;

    setPost(newPost);
    setNewPostTitle('');
    updateFiles();
  }

  async function handleLoadPost(postName: string) {
    const loadedPost = await PostSchema.loadPost(postName);
    if (isError(loadedPost)) return;

    setPost({
      ...loadedPost,
      created: new Date(loadedPost.created),
      modified: new Date(loadedPost.modified)
    });
  }

  async function handleSavePost() {
    if (isNil(id)) return;

    const $editor = editorRef.current;
    if (isNil($editor)) return;

    const content = await $editor.getContent();
    const meta = await $editor.getMeta();
    const updatedPost = {
      ...meta,
      content
    };
    const maybePost = await PostSchema.savePost(id, updatedPost);

    if (isError(maybePost)) {
      alert('저장에 실패했습니다.');
      return;
    }

    alert('저장되었습니다.');
    setPost(maybePost);
    updateFiles();
  }

  async function updateFiles() {
    const files = await FileSchema.fetchFileStructure();
    if (isError(files)) return;

    setFiles(files);
  }
  async function loadPostPath() {
    const maybeBasePath = await EnvSchema.fetchBasePath();
    if (isError(maybeBasePath)) return;

    // TODO: 브라우저에서 path.join할 수 있는 더 좋은 솔루션을 찾아보자
    // TODO: id가 비어있는 경우를 해결해야한다.
    const postPath = new URL(id ?? '', 'none://' + maybeBasePath + '/')
      .pathname;
    setPostPath(postPath);
  }

  useEffect(() => {
    updateFiles();
  }, []);

  useEffect(() => {
    if (isNil(id)) return;

    handleLoadPost(id);
    loadPostPath();
  }, [id]);

  return (
    <Flex direction="row" className={style}>
      <aside className={cx(explorerStyle)}>
        <Input value={newPostTitle} onChange={handleNewPostTitleChange}></Input>
        <Button onClick={handleCreateNewPost}>새 글쓰기</Button>
        {files.map((file) => (
          <li key={file.fileName}>
            <NavLink to={`/editor/${file.fileName}`}>{file.fileName}</NavLink>
          </li>
        ))}
      </aside>
      <Flex
        as="article"
        justify="flex-start"
        direction="column"
        className={cx(
          css({
            flexGrow: 1
          })
        )}
      >
        <PostEditor
          postPath={postPath}
          initPost={post}
          className={editorLayout}
          ref={editorRef}
        ></PostEditor>
        <Button onClick={handleSavePost}>저장하기</Button>
      </Flex>
    </Flex>
  );
}

const style = css({
  width: 'full',
  height: 'full'
});

const explorerStyle = css({
  width: 60,
  flexShrink: 0
});

const editorLayout = css({
  maxWidth: '900px',
  width: 'full',
  flexGrow: 1,
  height: 'full'
});
