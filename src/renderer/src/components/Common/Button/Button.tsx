import { ComponentProps } from 'react';

import { isNil } from '@/utils/type';
import { css, cx } from '@style/css';

interface Props extends ComponentProps<'button'> {}

export function Button({ children, type, className = '', ...props }: Props) {
  const buttonType = isNil(type) ? 'button' : type;

  return (
    <button type={buttonType} className={cx(style, className)} {...props}>
      {children}
    </button>
  );
}

const style = css({
  background: '#333',
  padding: '0.5rem 1rem',
  cursor: 'pointer'
});
