import {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  type ForwardedRef,
  useRef
} from 'react';

import dayjs from 'dayjs';

import { Flex, Input } from '@/components/Common';
import { css, cx } from '@style/css';
import { Post } from '@type/post';

import { TitleInput } from '../TitleInput';

type Meta = Omit<Post, 'content'>;
type Props = { initMeta: Meta };

export interface Reference {
  getMeta: () => Promise<Meta>;
}

function _MetaEditor(
  { initMeta, ...props }: Props,
  ref: ForwardedRef<Reference>
) {
  const exposableMeta = useRef({ ...initMeta });
  const [meta, setMeta] = useState<Meta>(initMeta);

  useEffect(() => {
    setMeta(initMeta);
    exposableMeta.current = {
      ...initMeta
    };
  }, [initMeta]);

  function handleTitleChange(evt: ChangeEvent<HTMLInputElement>) {
    const newTitle = evt.target.value;
    setMeta({ ...meta, title: newTitle });
    exposableMeta.current.title = newTitle;
  }

  function handleCreatedChange(evt: ChangeEvent<HTMLInputElement>) {
    const newCreated = new Date(evt.target.value);
    setMeta({ ...meta, created: newCreated });
    exposableMeta.current.created = newCreated;
  }

  function handleSlugChange(evt: ChangeEvent<HTMLInputElement>) {
    const newSlug = evt.target.value;
    setMeta({ ...meta, slug: newSlug });
    exposableMeta.current.slug = newSlug;
  }

  const getMeta = async () => {
    return Promise.resolve(exposableMeta.current);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        getMeta
      };
    },
    []
  );

  return (
    <Flex
      as="section"
      direction="column"
      id="meta-data-area"
      className={cx(metaAreaStyle)}
      {...props}
    >
      <TitleInput
        value={meta.title}
        onChange={handleTitleChange}
        className={titleInputStyle}
      ></TitleInput>
      <label>
        created:
        <Input
          type="datetime-local"
          value={dayjs(meta.created.toISOString()).format(
            'YYYY-MM-DDTHH:mm:ss'
          )}
          onChange={handleCreatedChange}
        ></Input>
      </label>
      <label>
        modified:
        <Input
          type="datetime-local"
          value={dayjs(meta.modified.toISOString()).format(
            'YYYY-MM-DDTHH:mm:ss'
          )}
          readOnly
        ></Input>
      </label>
      <label>
        slug:
        <Input
          type="text"
          value={meta.slug}
          onChange={handleSlugChange}
        ></Input>
      </label>
    </Flex>
  );
}

export const MetaEditor = forwardRef<Reference, Props>(_MetaEditor);

const titleInputStyle = css({
  width: 'full'
});

const metaAreaStyle = css({
  pl: '3.45rem'
});
