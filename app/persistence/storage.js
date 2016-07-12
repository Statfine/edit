/**
 * Created by eastiming on 16/7/12.
 */
let localStorage = null;

if (process.env.NODE_ENV === 'test') {
  class LocalStorage {
    constructor() {
      this.obj = {};
    }

    setItem(key, value) {
      this.obj[key] = value;
    }

    getItem(key) {
      return this.obj[key];
    }

    removeItem(key) {
      this.obj[key] = null;
    }

    clear() {
      this.obj = null;
    }
  }

  localStorage = new LocalStorage();
} else {
  localStorage = window.localStorage;
}

export function put(key, value) {
  localStorage.setItem(key, value);
}

export function get(key) {
  return localStorage.getItem(key);
}

export function remove(key) {
  return localStorage.removeItem(key);
}

export function clear() {
  localStorage.clear();
}
