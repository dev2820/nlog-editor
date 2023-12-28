import { ComponentProps } from 'react';

import { css, cx } from '@style/css';

interface Props extends ComponentProps<'input'> {}

export function Input({ className, ...props }: Props) {
  return <input className={cx(style, className)} {...props}></input>;
}

const style = css({
  border: '1px solid',
  borderColor: '#ccc'
});
