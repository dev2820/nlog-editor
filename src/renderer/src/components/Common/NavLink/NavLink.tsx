import { NavLink as _NavLink, type NavLinkProps } from 'react-router-dom';

import { anchorStyle } from '@/assets/styles';
import { cva, cx } from '@style/css';

interface Props extends Omit<NavLinkProps, 'className'> {
  className?: string;
}

export function NavLink({ children, className, ...props }: Props) {
  return (
    <_NavLink
      className={({ isActive }) => {
        const state = isActive ? 'active' : 'none';
        return cx(className, style({ state }));
      }}
      {...props}
    >
      {children}
    </_NavLink>
  );
}

const style = cva({
  base: {
    ...anchorStyle
  },
  variants: {
    state: {
      active: {
        color: 'blue' // TODO: panda css thema 정하기
      },
      none: {
        color: '#9feaf9'
      }
    }
  },
  defaultVariants: {
    state: 'none'
  }
});
