import { Link, Outlet } from 'react-router-dom';

import './assets/index.css';
import { css, cx } from '@style/css';

import { PageLayout } from './layouts/PageLayout';

export default function App() {
  return (
    <PageLayout>
      <header className={cx(headerStyle)}>head</header>
      <div className={cx(bodyStyle)}>
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
      <footer className={cx(footerStyle)}>footer</footer>
    </PageLayout>
  );
}

const mainStyle = css({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  height: 'full'
});

const bodyStyle = css({
  height: 'calc(100% - 3.4rem)',
  overflow: 'hidden'
});

const navStyle = css({
  float: 'left',
  width: 20,
  height: 'full'
});

const headerStyle = css({
  height: '1.7rem'
});

const footerStyle = css({
  height: '1.7rem'
});
