import { ComponentProps } from 'react';

import { Flex } from '@/components/Common';
import { css } from '@style/css';

interface Props extends ComponentProps<'div'> {}

export function PageLayout({ children, ...props }: Props) {
  return (
    <Flex as="div" direction="column" className={layout} {...props}>
      {children}
    </Flex>
  );
}

const layout = css({
  width: '100vw',
  height: '100vh'
});
