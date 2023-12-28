import '@blocknote/core/style.css';

import { type ComponentProps } from 'react';

import { BlockNoteEditor } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';

import { css, cx } from '@style/css';

/**
 * TODO: 에디터 스타일링 찾아보기 BlockNote
 */

interface Props extends ComponentProps<'div'> {
  onChangeContent: (content: string) => void;
}

export function BlockEditor({ onChangeContent, className, ...props }: Props) {
  async function handleEditorContentChange(editor: BlockNoteEditor) {
    const markdown: string = await editor.blocksToMarkdown(
      editor.topLevelBlocks
    );
    onChangeContent(markdown);
  }

  const editor = useBlockNote({
    onEditorContentChange: (editor) => {
      handleEditorContentChange(editor);
    }
  });

  return (
    <div className={cx(className)} {...props}>
      <BlockNoteView editor={editor} className={style} />
    </div>
  );
}

const style = css({
  width: 'full',
  height: 'full'
});
