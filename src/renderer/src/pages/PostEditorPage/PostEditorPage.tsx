import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { Button, Flex, Input } from '@/components/Common';
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

  useEffect(() => {
    updateFiles();
  }, []);

  useEffect(() => {
    if (isNil(id)) return;

    handleLoadPost(id);
  }, [id]);
  //TODO: expose 이용해서 Link 이동하기 전에 현재 코드 저장하기 기능 구현
  return (
    <Flex direction="row" className={style}>
      <aside className={cx(explorerStyle)}>
        <Input value={newPostTitle} onChange={handleNewPostTitleChange}></Input>
        <Button onClick={handleCreateNewPost}>새 글쓰기</Button>
        {files.map((file) => (
          <li key={file.fileName}>
            <Link to={`/editor/${file.fileName}`}>{file.fileName}</Link>
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
