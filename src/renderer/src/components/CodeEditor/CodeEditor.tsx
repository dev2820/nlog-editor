import {
  forwardRef,
  type ComponentProps,
  type ForwardedRef,
  useState
} from 'react';

import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';

import { css } from '@style/css';

type Lang = 'html' | 'js' | 'ts' | 'css' | 'json' | 'jsx' | 'ts' | 'tsx';

interface Props extends ComponentProps<'div'> {
  lang: Lang;
  initCode: string;
}

const extensionMap = {
  js: javascript({ jsx: true })
};

function _CodeEditor(
  { lang = 'js', initCode = '', ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [code, setCode] = useState<string>(initCode);

  function handleChangeCode(newCode: string) {
    setCode(newCode);
  }

  return (
    <div className={style} ref={ref} data-code={code} {...props}>
      <CodeMirror
        value={initCode}
        height="200px"
        theme={dracula}
        extensions={[extensionMap[lang]]}
        onChange={handleChangeCode}
      />
    </div>
  );
}

export const CodeEditor = forwardRef<HTMLDivElement, Props>(_CodeEditor);

const style = css({
  borderRadius: '0.25rem'
});
