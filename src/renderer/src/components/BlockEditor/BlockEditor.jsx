import '@blocknote/core/style.css';

import { useEffect, forwardRef, useImperativeHandle } from 'react';

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
import TurndownService from 'turndown';

import { CodeEditor } from '@/components/CodeEditor';
import { isNil } from '@/utils/type';
import { css, cx } from '@style/css';

/**
 * TODO: 에디터 스타일링 찾아보기 BlockNote
 */
const turndownService = new TurndownService({
  headingStyle: 'atx',
  fence: '```',
  linkStyle: 'inlined',
  codeBlockStyle: 'fenced'
});

const CodeBlock = createReactBlockSpec(
  {
    type: 'codeBlock',
    propSchema: {
      ...defaultProps,
      lang: {
        default: 'js'
      },
      code: {
        default: ''
      }
    },
    content: 'none'
  },
  {
    render: ({ block, contentRef }) => {
      const { lang, code } = block.props;
      return (
        <CodeEditor
          className="code-editor"
          lang={lang}
          initCode={code}
          ref={contentRef}
        ></CodeEditor>
      );
    },
    toExternalHTML: ({ block, contentRef }) => {
      const blockId = block.id;
      const $code = document.querySelector(
        `[data-id="${blockId}"] .code-editor`
      );

      return (
        <pre ref={contentRef} data-code={$code.dataset['code']}>
          <code className={`language-${block.props.lang}`}>
            {$code.dataset['code']}
          </code>
        </pre>
      );
    },
    parse: (element) => {
      if (element.tagName === 'PRE') {
        const $code = element.querySelector('code');
        if (isNil($code)) return undefined;

        const code = $code.textContent;
        const lang = $code.dataset['language'];

        return {
          code,
          lang
        };
      }
      return undefined;
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

const insertCodeBlock = {
  name: 'Insert Code Block',
  hint: 'Used to insert a code block',
  execute: (editor) => {
    editor.insertBlocks(
      [
        {
          type: 'codeBlock',
          props: {
            lang: 'js',
            code: `function abc() {
  console.log('hello world')
}`
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
/**
 * TODO: useImperativeHandle 사용해서 extract 하는 함수를 만들 것
 */
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
          const markdown = turndownService.turndown(html);
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
