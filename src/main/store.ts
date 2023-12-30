import fs from 'fs';
import path from 'path';

import electron from 'electron';

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

type StoreOpts = {
  configName: string;
  defaults: JSONValue;
};

class Store {
  path: string = '';
  data: Record<string, JSONValue>;
  constructor(opts: StoreOpts = { configName: 'global', defaults: {} }) {
    const userDataPath = electron.app.getPath('userData');
    this.path = path.join(userDataPath, opts.configName + '.json');

    this.data = parseDataFile(this.path, opts.defaults);
  }

  get(key: string) {
    return this.data[key];
  }

  set(key: string, val: JSONValue) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath: string, defaults: JSONValue) {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } catch (error) {
    return defaults;
  }
}

const store = new Store({
  configName: 'user-persistences',
  defaults: {
    windowSize: { width: 900, height: 670 },
    basePath: '/'
  }
});

export default store;
