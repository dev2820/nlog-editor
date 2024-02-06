import {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type ForwardedRef,
  useEffect
} from 'react';

import dayjs from 'dayjs';

import { BlockEditor } from '@/components/BlockEditor';
import { Flex, Input } from '@/components/Common';
import { isNil } from '@/utils/type';
import { css, cx } from '@style/css';
import { Post } from '@type/post';

import { TitleInput } from '../TitleInput';

interface Props extends ComponentProps<'div'> {
  initPost: Post;
}

export interface Reference {
  getContent: () => Promise<string>;
  getMeta: () => {
    title: string;
    created: Date;
    modified: Date;
    slug: string;
  };
}

function _PostEditor(
  { initPost, className, ...props }: Props,
  ref: ForwardedRef<Reference>
) {
  const [post, setPost] = useState<Post>(initPost);
  const editorRef = useRef<HTMLDivElement & { getMarkdown: () => string }>(
    null
  );

  useEffect(() => {
    setPost(initPost);
  }, [initPost]);

  function handleTitleChange(evt: ChangeEvent<HTMLInputElement>) {
    const newTitle = evt.target.value;
    setPost({ ...post, title: newTitle });
  }

  function handleCreatedChange(evt: ChangeEvent<HTMLInputElement>) {
    const newCreated = new Date(evt.target.value);
    setPost({ ...post, created: newCreated });
  }

  function handleSlugChange(evt: ChangeEvent<HTMLInputElement>) {
    const newSlug = evt.target.value;
    setPost({ ...post, slug: newSlug });
  }

  useImperativeHandle(
    ref,
    () => ({
      async getContent() {
        const ref = editorRef.current;
        if (isNil(ref)) {
          return Promise.resolve('');
        }
        return ref.getMarkdown();
      },
      getMeta() {
        return {
          ...post,
          modified: new Date()
        };
      }
    }),
    []
  );

  return (
    <div {...props} className={cx(className, style)}>
      <Flex
        as="section"
        direction="column"
        id="meta-data-area"
        className={metaAreaStyle}
      >
        <TitleInput
          value={post.title}
          onChange={handleTitleChange}
          className={titleInputStyle}
        ></TitleInput>
        <label>
          created:
          <Input
            type="datetime-local"
            value={dayjs(post.created.toISOString()).format(
              'YYYY-MM-DDTHH:mm:ss'
            )}
            onChange={handleCreatedChange}
          ></Input>
        </label>
        <label>
          modified:
          <Input
            type="datetime-local"
            value={dayjs(post.modified.toISOString()).format(
              'YYYY-MM-DDTHH:mm:ss'
            )}
            readOnly
          ></Input>
        </label>
        <label>
          slug:
          <Input
            type="text"
            value={post.slug}
            onChange={handleSlugChange}
          ></Input>
        </label>
      </Flex>
      <BlockEditor initMarkdown={post.content} ref={editorRef}></BlockEditor>
    </div>
  );
}

export const PostEditor = forwardRef<Reference, Props>(_PostEditor);

const style = css({
  overflow: 'auto'
});
const titleInputStyle = css({
  width: 'full'
});

const metaAreaStyle = css({
  pl: '3.45rem'
});
