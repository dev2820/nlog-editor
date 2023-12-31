import { ChangeEvent, ComponentProps } from 'react';

import { BlockEditor } from '@/components/BlockEditor';
import { Input } from '@/components/Common';
import { isNil } from '@/utils/type';
import { css } from '@style/css';

import { Post } from '../../types';
import { TitleInput } from '../TitleInput';

interface Props extends ComponentProps<'div'> {
  /**
   * Post에 대한 CRUD가 가능한 Context를 받는다.
   */
  post: Post;
  onUpdatePost?: (newPost: Post) => void;
}

export function PostEditor({ post, onUpdatePost, ...props }: Props) {
  function handleEditorContentChange(newContent: string): void {
    if (isNil(onUpdatePost)) return;

    onUpdatePost({
      ...post,
      content: newContent
    });
  }

  function handleTitleChange(evt: ChangeEvent<HTMLInputElement>) {
    const newTitle = evt.target.value;

    if (isNil(onUpdatePost)) return;

    onUpdatePost({
      ...post,
      title: newTitle
    });
  }
  console.log(post.content);

  return (
    <div {...props}>
      <section id="meta-data-area">
        <TitleInput
          value={post.title}
          onChange={handleTitleChange}
          className={titleInputStyle}
        ></TitleInput>
        <Input type="datetime-local"></Input>
      </section>
      <BlockEditor
        onChangeContent={handleEditorContentChange}
        initMarkdown={post.content}
      ></BlockEditor>
    </div>
  );
}

const titleInputStyle = css({
  width: 'full'
});
