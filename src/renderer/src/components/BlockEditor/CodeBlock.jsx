import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import * as Icon from 'react-feather';

import { isNil } from '@/utils/type';

import { CodeEditor } from '../CodeEditor';

export const insertCodeBlock = {
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

export const CodeBlock = createReactBlockSpec(
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
