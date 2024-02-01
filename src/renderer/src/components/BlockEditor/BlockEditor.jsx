import '@blocknote/core/style.css';

import { useEffect } from 'react';

import {
  defaultProps,
  defaultBlockSchema,
  defaultBlockSpecs
} from '@blocknote/core';
import {
  BlockNoteView,
  useBlockNote,
  getDefaultReactSlashMenuItems,
  createReactBlockSpec
} from '@blocknote/react';
import * as Icon from 'react-feather';

import { css, cx } from '@style/css';
/**
 * TODO: 에디터 스타일링 찾아보기 BlockNote
 */
const CodeBlock = createReactBlockSpec(
  {
    type: 'codeBlock',
    propSchema: {
      ...defaultProps,
      lang: {
        default: 'js'
      }
    },
    content: 'none'
  },
  {
    render: ({ block, contentRef }) => {
      const style = {
        lang: block.props.lang
      };
      console.log(style);
      return (
        <pre ref={contentRef}>
          <code>code here</code>
        </pre>
      );
    },
    toExternalHTML: ({ contentRef }) => (
      <pre ref={contentRef}>
        <code>code here</code>
      </pre>
    ),
    parse: (element) => {
      const font = element.style.fontFamily;

      if (font === '') {
        return;
      }

      return {
        font: font || undefined
      };
    }
  }
);

const blockSchema = {
  ...defaultBlockSchema,
  codeBlock: CodeBlock.config
};

const blockSpecs = {
  ...defaultBlockSpecs,
  codeBlock: CodeBlock
};

// Creates a slash menu item for inserting a font paragraph block.
const insertCodeBlock = {
  name: 'Insert Code Block',
  hint: 'Used to insert a code block',
  execute: (editor) => {
    editor.insertBlocks(
      [
        {
          type: 'codeBlock',
          props: {
            lang: 'js' || undefined
          }
        }
      ],
      editor.getTextCursorPosition().block,
      'after'
    );
  },
  aliases: ['code', 'cd'],
  group: 'Code',
  icon: <Icon.Code size={18} />
};

const customSlashMenuItemList = [
  ...getDefaultReactSlashMenuItems(blockSchema),
  insertCodeBlock
];

export function BlockEditor({
  initMarkdown,
  onChangeContent,
  className,
  ...props
}) {
  async function handleEditorContentChange(editor) {
    const markdown = await editor.blocksToMarkdownLossy(editor.topLevelBlocks);
    onChangeContent(markdown);
  }

  const editor = useBlockNote({
    slashMenuItems: customSlashMenuItemList,
    blockSpecs: blockSpecs,

    onEditorContentChange: (editor) => {
      handleEditorContentChange(editor);
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

const style = css({
  width: 'full',
  height: 'full'
});
