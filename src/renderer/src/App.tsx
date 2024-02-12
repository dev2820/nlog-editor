import { Outlet } from 'react-router-dom';

import './assets/index.css';
import { css, cx } from '@style/css';

import { Flex, NavLink } from './components/Common';
import { PageLayout } from './layouts/PageLayout';

/**
 * TODO: test-post 확장하기
 * TODO: 테마 정하기
 * TODO: 파일 목록에 이미지도 볼 수 있게 하기
 * TODO: Post에 author 추가 (SettingPage에도)
 * TODO: default 화면 만들기
 */

export default function App() {
  return (
    <PageLayout>
      <header className={cx(headerStyle)}>head</header>
      <Flex as="div" direction="row" className={cx(bodyStyle)}>
        <nav className={cx(navStyle)}>
          <menu>
            <li>
              <NavLink to={'/editor'}>에디터</NavLink>
            </li>
            <li>
              <NavLink to={'/setting'}>세팅</NavLink>
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
