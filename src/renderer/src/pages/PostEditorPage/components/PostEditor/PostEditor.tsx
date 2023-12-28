import { ChangeEvent, ComponentProps, useState } from 'react';

import { BlockEditor } from '@/components/BlockEditor';
import { Button, Input } from '@/components/Common';
import { css } from '@style/css';

import { TitleInput } from '../TitleInput';

interface Props extends ComponentProps<'div'> {
  /**
   * Post에 대한 CRUD가 가능한 Context를 받는다.
   */
}

export function PostEditor({ ...props }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleEditorContentChange(newContent: string): void {
    setContent(newContent);
  }

  function handleTitleChange(evt: ChangeEvent<HTMLInputElement>) {
    const newTitle = evt.target.value;
    setTitle(newTitle);
  }

  function handleUpdateFile() {
    window.api.updateFile(`./${title}`, content);
  }

  return (
    <div {...props}>
      <section id="meta-data-area">
        <TitleInput
          value={title}
          onChange={handleTitleChange}
          className={titleInputStyle}
        ></TitleInput>
        <Input type="datetime-local"></Input>
      </section>
      <BlockEditor onChangeContent={handleEditorContentChange}></BlockEditor>
      <Button onClick={handleUpdateFile}>저장하기</Button>
    </div>
  );
}

const titleInputStyle = css({
  width: 'full'
});
