import '@blocknote/core/style.css';

import { useEffect, type ComponentProps } from 'react';

import { type BlockNoteEditor, type Block } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';

import { css, cx } from '@style/css';

/**
 * TODO: 에디터 스타일링 찾아보기 BlockNote
 */

interface Props extends ComponentProps<'div'> {
  onChangeContent: (content: string) => void;
  initMarkdown: string;
}

export function BlockEditor({
  initMarkdown,
  onChangeContent,
  className,
  ...props
}: Props) {
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

  useEffect(() => {
    if (editor) {
      const getBlocks = async () => {
        const blocks: Block[] = await editor.markdownToBlocks(initMarkdown);
        editor.replaceBlocks(editor.topLevelBlocks, blocks);
      };
      getBlocks();
    }
  }, [editor, initMarkdown]);

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
