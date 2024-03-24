import electron from 'electron';
import fs from 'fs';
import path from 'path';

const Store = class Store {
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, opts.configName + '.json');
    this.defaults = opts.defaults;
    this.data = this.parseDataFile(this.path, opts.defaults);
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  parseDataFile(filePath, defaults) {
    try {
      let loaded = JSON.parse(fs.readFileSync(filePath));
      for (const [key, _] of Object.entries(this.defaults)) {
        if (!(key in loaded)) {
          loaded[key] = this.defaults[key];
        }
      }
      return loaded;
    } catch(error) {
      return defaults;
    }
  }
};

export default Store;