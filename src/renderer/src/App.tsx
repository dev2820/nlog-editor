import { Link, Outlet } from 'react-router-dom';

import './assets/index.css';
import { css, cx } from '@style/css';

import { Flex } from './components/Common';
import { PageLayout } from './layouts/PageLayout';

export default function App() {
  return (
    <PageLayout>
      <header className={cx(headerStyle)}>head</header>
      <Flex as="div" direction="row" className={cx(bodyStyle)}>
        <nav className={cx(navStyle)}>
          <menu>
            <li>
              <Link to={'/editor'}>에디터</Link>
            </li>
            <li>
              <Link to={'/setting'}>세팅</Link>
            </li>
          </menu>
        </nav>
        <main className={mainStyle}>
          <Outlet></Outlet>
        </main>
      </Flex>
      <footer className={cx(footerStyle)}>footer</footer>
    </PageLayout>
  );
}

const mainStyle = css({
  flexGrow: 1,
  height: 'full'
});

const bodyStyle = css({
  height: 'calc(100% - 3.4rem)',
  overflow: 'hidden'
});

const navStyle = css({
  width: 20,
  height: 'full',
  flexShrink: 0
});

const headerStyle = css({
  height: '1.7rem'
});

const footerStyle = css({
  height: '1.7rem'
});
