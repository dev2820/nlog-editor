import { ComponentProps } from 'react';

import { css } from '@style/css';

interface Props extends ComponentProps<'div'> {}

export function PageLayout({ children, ...props }: Props) {
  return (
    <div className={layout} {...props}>
      {children}
    </div>
  );
}

const layout = css({
  width: '100vw',
  height: '100vh'
});
