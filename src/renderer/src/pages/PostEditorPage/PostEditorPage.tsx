import { Flex } from '@/components/Common';
import { PageLayout } from '@/layouts/PageLayout';
import { css, cx } from '@style/css';

import { PostEditor } from './components/PostEditor';

export function PostEditorPage() {
  return (
    <PageLayout>
      <header>head</header>
      <main className={mainStyle}>
        <nav className={cx(navStyle)}>
          <button>세팅</button>
        </nav>
        <aside className={cx(explorerStyle)}>explorer</aside>
        <Flex
          as="article"
          justify="center"
          className={cx(
            css({
              flexGrow: 1,
              overflow: 'auto'
            })
          )}
        >
          <PostEditor className={editorLayout}></PostEditor>
        </Flex>
      </main>
      <footer>foot</footer>
    </PageLayout>
  );
}

const mainStyle = css({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden'
});

const navStyle = css({
  width: 20,
  flexShrink: 0
});

const explorerStyle = css({
  width: 60,
  flexShrink: 0
});

const editorLayout = css({
  maxWidth: '900px',
  width: 'full'
});
