import { ChangeEvent, ComponentProps } from 'react';

import { BlockEditor } from '@/components/BlockEditor';
import { Input } from '@/components/Common';
import { isNil } from '@/utils/type';
import { css } from '@style/css';

import { TitleInput } from '../TitleInput';

interface Props extends ComponentProps<'div'> {
  /**
   * Post에 대한 CRUD가 가능한 Context를 받는다.
   */
  title: string;
  content: string;
  onUpdateContent?: (newContent: string) => void;
  onUpdateTitle?: (newTitle: string) => void;
}

export function PostEditor({
  title,
  content,
  onUpdateContent,
  onUpdateTitle,
  ...props
}: Props) {
  function handleEditorContentChange(newContent: string): void {
    if (isNil(onUpdateContent)) return;

    onUpdateContent(newContent);
  }

  function handleTitleChange(evt: ChangeEvent<HTMLInputElement>) {
    const newTitle = evt.target.value;
    if (isNil(onUpdateTitle)) return;

    onUpdateTitle(newTitle);
  }

  return (
    <div {...props}>
      <section id="meta-data-area" className={metaAreaStyle}>
        <TitleInput
          value={title}
          onChange={handleTitleChange}
          className={titleInputStyle}
        ></TitleInput>
        <Input type="datetime-local"></Input>
      </section>
      <BlockEditor
        onChangeContent={handleEditorContentChange}
        initMarkdown={content}
      ></BlockEditor>
    </div>
  );
}

const titleInputStyle = css({
  width: 'full'
});

const metaAreaStyle = css({
  pl: '3.45rem'
});
