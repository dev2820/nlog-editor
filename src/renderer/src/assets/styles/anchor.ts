import { css } from '@style/css';

export const anchorStyle = css.raw({
  color: '#9feaf9',
  fontWeight: 600,
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 'none',
  '&:hover': {
    borderBottom: '1px solid'
  }
});
