import '@blocknote/core/style.css';

import { useEffect, forwardRef, useImperativeHandle } from 'react';

import { defaultBlockSchema, defaultBlockSpecs } from '@blocknote/core';
import {
  BlockNoteView,
  useBlockNote,
  getDefaultReactSlashMenuItems
} from '@blocknote/react';

import { omit } from '@/utils/omit';
import { isNil } from '@/utils/type';
import { css, cx } from '@style/css';

import { CodeBlock, insertCodeBlock } from './CodeBlock';
import { htmlToMarkdown } from './htmlToMarkdown';

/**
 * TODO: 에디터 스타일링 찾아보기 BlockNote
 */

const blockSchema = {
  ...omit(defaultBlockSchema, 'table'),
  codeBlock: CodeBlock.config
};
const blockSpecs = {
  ...omit(defaultBlockSpecs, 'table'),
  codeBlock: CodeBlock
};

const customSlashMenuItemList = [
  ...getDefaultReactSlashMenuItems(blockSchema),
  insertCodeBlock
];

function _BlockEditor(
  { initMarkdown, onChangeContent, className, ...props },
  ref
) {
  useImperativeHandle(
    ref,
    () => {
      return {
        async getMarkdown() {
          const html = await editor.blocksToHTMLLossy(editor.topLevelBlocks);
          const markdown = htmlToMarkdown(html);
          return markdown;
        }
      };
    },
    []
  );

  async function handleEditorContentChange(editor) {
    if (isNil(onChangeContent)) return;
    const markdown = await editor.blocksToMarkdownLossy(editor.topLevelBlocks);
    onChangeContent(markdown);
  }

  const editor = useBlockNote({
    slashMenuItems: customSlashMenuItemList,
    blockSpecs: blockSpecs,

    onEditorContentChange: (editor) => {
      handleEditorContentChange(editor);
    },

    uploadFile: (file) => {
      // TODO: 이미지 파일을 지정 위치에 저장하기
      return `media://${file.path}`;
    }
  });

  useEffect(() => {
    if (editor) {
      const getBlocks = async () => {
        const blocks = await editor.tryParseMarkdownToBlocks(initMarkdown);

        editor.replaceBlocks(editor.topLevelBlocks, blocks);
      };
      getBlocks();
    }
  }, [editor, initMarkdown]);

  return (
    <div className={cx(className)} {...props}>
      <BlockNoteView editor={editor} className={style} theme={'dark'} />
    </div>
  );
}

export const BlockEditor = forwardRef(_BlockEditor);

const style = css({
  width: 'full',
  height: 'full'
});
