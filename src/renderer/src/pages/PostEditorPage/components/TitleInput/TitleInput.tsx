import { ComponentProps } from 'react';

import { css, cx } from '@style/css';

interface Props extends ComponentProps<'input'> {}

export function TitleInput({ className, ...props }: Props) {
  return (
    <input
      placeholder="제목을 입력해주세요"
      className={cx(style, boxStyle, className)}
      {...props}
    ></input>
  );
}

const style = css({
  fontWeight: 'bold',
  fontSize: '4xl',
  background: 'transparent'
});

const boxStyle = css({
  outline: 'none'
});
