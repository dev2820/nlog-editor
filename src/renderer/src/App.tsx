import { Link, Outlet } from 'react-router-dom';

import './assets/index.css';
import { css, cx } from '@style/css';

import { PageLayout } from './layouts/PageLayout';

export default function App() {
  return (
    <PageLayout>
      <header>head</header>
      <div className={cx(css({ flexGrow: 1 }))}>
        <nav className={cx(navStyle)}>
          <menu>
            <li>
              <Link to={'/'}>에디터</Link>
            </li>
            <li>
              <Link to={'/setting'}>세팅</Link>
            </li>
          </menu>
        </nav>
        <main className={mainStyle}>
          <Outlet></Outlet>
        </main>
      </div>
      <footer>footer</footer>
    </PageLayout>
  );
}

const mainStyle = css({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  height: 'full'
});

const navStyle = css({
  float: 'left',
  width: 20,
  height: 'full'
});
