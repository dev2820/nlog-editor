import {
  ComponentProps,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  type ForwardedRef
} from 'react';

import { BlockEditor } from '@/components/BlockEditor';
import { isNil } from '@/utils/type';
import { css, cx } from '@style/css';
import { Post } from '@type/post';

import {
  MetaEditor,
  type Reference as MetaEditorReference
} from './MetaEditor';

interface Props extends ComponentProps<'div'> {
  postPath: string;
  initPost: Post;
}

export interface Reference {
  getContent: () => Promise<string>;
  getMeta: () => Promise<Omit<Post, 'content'>>;
}

function _PostEditor(
  { initPost, postPath, className, ...props }: Props,
  ref: ForwardedRef<Reference>
) {
  const [post, setPost] = useState<Post>(initPost);
  const editorRef = useRef<HTMLDivElement & { getMarkdown: () => string }>(
    null
  );
  const metaEditorRef = useRef<MetaEditorReference>(null);

  useEffect(() => {
    setPost(initPost);
  }, [initPost]);

  async function getContent() {
    const ref = editorRef.current;
    if (isNil(ref)) {
      return Promise.resolve('');
    }
    return ref.getMarkdown();
  }

  async function getMeta() {
    const ref = metaEditorRef.current;
    if (isNil(ref)) {
      return Promise.resolve({
        title: '',
        created: new Date(0),
        modified: new Date(0),
        slug: ''
      });
    }
    return ref.getMeta();
  }

  useImperativeHandle(
    ref,
    () => ({
      getContent,
      getMeta
    }),
    []
  );

  return (
    <div {...props} className={cx(className, style)}>
      <MetaEditor
        initMeta={{
          title: post.title,
          created: post.created,
          modified: post.modified,
          slug: post.slug
        }}
        ref={metaEditorRef}
      ></MetaEditor>
      <BlockEditor
        postPath={postPath}
        initMarkdown={post.content}
        ref={editorRef}
      ></BlockEditor>
    </div>
  );
}

export const PostEditor = forwardRef<Reference, Props>(_PostEditor);

const style = css({
  overflow: 'auto'
});
