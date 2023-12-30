import { ChangeEvent, useEffect, useState } from 'react';

import { Button, Input } from '@/components/Common';
import { css } from '@style/css';

const PLZ_WRITE_FILE_PATH = '탐색기가 기준삼을 경로를 입력해주세요';

export function SettingPage() {
  const initPath = '';
  const [path, setPath] = useState(initPath);

  function handleChangePath(e: ChangeEvent<HTMLInputElement>) {
    const newPath = e.target.value;

    setPath(newPath);
  }

  function handleUpdatePath() {
    window.api.setBasePath(path);
  }

  async function initBasePath() {
    const basePath = await window.api.fetchBasePath();
    setPath(basePath);
  }

  useEffect(() => {
    initBasePath();
  }, []);

  return (
    <div className={css({ flexGrow: 1 })}>
      <Input
        className={css({ maxWidth: '500px', width: 'full' })}
        placeholder={PLZ_WRITE_FILE_PATH}
        value={path}
        onChange={handleChangePath}
      ></Input>
      <Button onClick={handleUpdatePath}>저장</Button>
    </div>
  );
}
