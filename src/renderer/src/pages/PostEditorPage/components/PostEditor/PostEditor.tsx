import { ChangeEvent, ComponentProps } from 'react';

import dayjs from 'dayjs';

import { BlockEditor } from '@/components/BlockEditor';
import { Flex, Input } from '@/components/Common';
import { isNil } from '@/utils/type';
import { css, cx } from '@style/css';

import { TitleInput } from '../TitleInput';

interface Props extends ComponentProps<'div'> {
  /**
   * Post에 대한 CRUD가 가능한 Context를 받는다.
   */
  title: string;
  created: Date;
  modified: Date;
  content: string;
  slug: string;
  onUpdateTitle?: (newTitle: string) => void;
  onUpdateCreated?: (newCreated: Date) => void;
  onUpdateContent?: (newContent: string) => void;
  onUpdateSlug?: (newSlug: string) => void;
}

export function PostEditor({
  title,
  created,
  modified,
  content,
  slug,
  className,
  onUpdateContent,
  onUpdateCreated,
  onUpdateTitle,
  onUpdateSlug,
  ...props
}: Props) {
  function handleEditorContentChange(newContent: string): void {
    if (isNil(onUpdateContent)) return;

    onUpdateContent(newContent);
  }

  function handleTitleChange(evt: ChangeEvent<HTMLInputElement>) {
    if (isNil(onUpdateTitle)) return;

    const newTitle = evt.target.value;
    onUpdateTitle(newTitle);
  }

  function handleCreatedChange(evt: ChangeEvent<HTMLInputElement>) {
    if (isNil(onUpdateCreated)) return;

    const newCreated = new Date(evt.target.value);
    onUpdateCreated(newCreated);
  }

  function handleSlugChange(evt: ChangeEvent<HTMLInputElement>) {
    if (isNil(onUpdateSlug)) return;

    const newSlug = evt.target.value;
    onUpdateSlug(newSlug);
  }

  return (
    <div {...props} className={cx(className, style)}>
      <Flex
        as="section"
        direction="column"
        id="meta-data-area"
        className={metaAreaStyle}
      >
        <TitleInput
          value={title}
          onChange={handleTitleChange}
          className={titleInputStyle}
        ></TitleInput>
        <label>
          created:
          <Input
            type="datetime-local"
            value={dayjs(created.toISOString()).format('YYYY-MM-DDTHH:mm:ss')}
            onChange={handleCreatedChange}
          ></Input>
        </label>
        <label>
          modified:
          <Input
            type="datetime-local"
            value={dayjs(modified.toISOString()).format('YYYY-MM-DDTHH:mm:ss')}
            readOnly
          ></Input>
        </label>
        <label>
          slug:
          <Input type="text" value={slug} onChange={handleSlugChange}></Input>
        </label>
      </Flex>
      <BlockEditor
        onChangeContent={handleEditorContentChange}
        initMarkdown={content}
      ></BlockEditor>
    </div>
  );
}

const style = css({
  overflow: 'auto'
});
const titleInputStyle = css({
  width: 'full'
});

const metaAreaStyle = css({
  pl: '3.45rem'
});
