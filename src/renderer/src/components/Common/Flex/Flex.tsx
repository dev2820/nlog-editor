import { ComponentProps } from 'react';

import { cx } from '@style/css';
import { flex, type FlexProperties } from '@style/patterns';

interface Props extends ComponentProps<'div'>, FlexProperties {
  as?: React.ElementType;
}

export function Flex({
  direction,
  align,
  justify,
  wrap,
  basis,
  grow,
  shrink,
  className,
  children,
  as = 'div',
  ...props
}: Props) {
  const As = as;
  return (
    <As
      className={cx(
        className,
        flex({ direction, align, justify, wrap, basis, grow, shrink })
      )}
      {...props}
    >
      {children}
    </As>
  );
}
