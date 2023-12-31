import { ChangeEvent, useState } from 'react';

import { Button, Flex, Input } from '@/components/Common';
import { isNil } from '@/utils/type';
import { css, cx } from '@style/css';

import { PostEditor } from './components/PostEditor';
import { Post } from './types';

export function PostEditorPage() {
  const [postTitle, setPostTitle] = useState('');
  const [post, setPost] = useState<Post>({
    title: '',
    created: new Date(),
    content: ''
  });
  function handleChangeTitle(evt: ChangeEvent<HTMLInputElement>) {
    const title = evt.target.value;
    setPostTitle(title);
  }
  async function handleCreateNewPost() {
    const newPost = await window.api.createPost(postTitle);
    setPostTitle('');
    if (isNil(newPost)) return;
    setPost(newPost);
  }

  function handleUpdatePost() {
    window.api.updateFile(`./${post.title}`, post.content);
    alert('저장되었습니다.');
  }

  return (
    <Flex direction="row">
      <aside className={cx(explorerStyle)}>
        <Input value={postTitle} onChange={handleChangeTitle}></Input>
        <Button onClick={handleCreateNewPost}>새 글쓰기</Button>
      </aside>
      <Flex
        as="article"
        justify="center"
        className={cx(
          css({
            flexGrow: 1,
            overflow: 'auto'
          })
        )}
      >
        <PostEditor
          post={post}
          onUpdatePost={handleUpdatePost}
          className={editorLayout}
        ></PostEditor>

        <Button onClick={handleUpdatePost}>저장하기</Button>
      </Flex>
    </Flex>
  );
}

const explorerStyle = css({
  width: 60,
  flexShrink: 0
});

const editorLayout = css({
  maxWidth: '900px',
  width: 'full'
});
