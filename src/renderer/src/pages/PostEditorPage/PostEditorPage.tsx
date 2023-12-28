import { Flex } from '@/components/Common';
import { css, cx } from '@style/css';

import { PostEditor } from './components/PostEditor';

export function PostEditorPage() {
  return (
    <Flex direction="row">
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
    </Flex>
  );
}

const explorerStyle = css({
  width: 60,
  flexShrink: 0
});

const editorLayout = css({
  maxWidth: '900px',
  width: 'full'
});
