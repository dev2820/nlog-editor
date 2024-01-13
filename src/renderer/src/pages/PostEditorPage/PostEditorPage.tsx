import { ChangeEvent, useEffect, useState } from 'react';

import { Button, Flex, Input } from '@/components/Common';
import { isNil } from '@/utils/type';
import { css, cx } from '@style/css';
import { File } from '@type/file';

import { PostEditor } from './components/PostEditor';

/**
 * TODO: 포스트 리스트를 클릭시 로드하는 기능 추가
 */
export function PostEditorPage() {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [postName, setPostName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File<'post' | 'image'>[]>([]);
  function handleChangeTitle(evt: ChangeEvent<HTMLInputElement>) {
    const title = evt.target.value;
    setNewPostTitle(title);
  }
  async function handleCreateNewPost() {
    const newPost = await window.api.createPost(newPostTitle);
    if (isNil(newPost)) return;
    setPostName(newPost.title);
    setTitle(newPost.title);
    setContent(newPost.content);
    setNewPostTitle('');
    updateFiles();
  }

  function handleUpdateContent(newContent: string) {
    setContent(newContent);
  }

  function handleUpdateTitle(newTitle: string) {
    setTitle(newTitle);
  }

  async function handleLoadPost(postName: string) {
    const post = await window.api.loadPost(postName);
    if (isNil(post)) return;

    setPostName(post.title);
    setTitle(post.title);
    setContent(post.content);
  }

  async function handleSavePost() {
    const isSuccess = await window.api.savePost(postName, {
      title,
      created: new Date(), // 임시 created, 전달받은 날짜를 가져오도록 해야함
      content
    });
    if (isSuccess) {
      alert('저장되었습니다.');

      updateFiles();
    } else {
      alert('저장에 실패했습니다.');
    }
  }

  async function updateFiles() {
    const files = await window.api.fetchFileStructure();
    setFiles(files);
  }

  useEffect(() => {
    updateFiles();
  }, []);

  return (
    <Flex direction="row">
      <aside className={cx(explorerStyle)}>
        <Input value={newPostTitle} onChange={handleChangeTitle}></Input>
        <Button onClick={handleCreateNewPost}>새 글쓰기</Button>
        {files.map((file) => (
          <li key={file.fileName}>
            <Button onClick={() => handleLoadPost(file.fileName)}>
              {file.fileName}
            </Button>
          </li>
        ))}
      </aside>
      <Flex
        as="article"
        justify="center"
        direction="column"
        className={cx(
          css({
            flexGrow: 1,
            overflow: 'auto'
          })
        )}
      >
        <PostEditor
          title={title}
          content={content}
          onUpdateContent={handleUpdateContent}
          onUpdateTitle={handleUpdateTitle}
          className={editorLayout}
        ></PostEditor>

        <Button onClick={handleSavePost}>저장하기</Button>
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
  width: 'full',
  flexGrow: 1
});
