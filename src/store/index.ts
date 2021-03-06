import { readonly } from "vue";
import PokemonModule from "./pokemon";

const Store = readonly({
  Pokemon: PokemonModule
});

export default function useStore(module) {
  if (module) {
    return Store[module];
  }

  return Store;
}

const keyConfig = (url: String, params?) => {
  if (!params) {
    return url;
  }

  const ordered = {};
  Object.keys(params)
    .sort()
    .forEach(function(key) {
      ordered[key] = params[key];
    });

  const newParams: any = [];
  for (const item of Object.keys(ordered)) {
    newParams.push(`${item}/${ordered[item]}`);
  }

  return [url, ...newParams].join("/");
};

class StorageCache {
  STORAGE_KEY = "Pokemon";

  private encode(storage) {
    return btoa(JSON.stringify(storage));
  }
  private decode(storage) {
    return JSON.parse(atob(storage));
  }

  get(root, path) {
    const fullPath: any = keyConfig(root, path);
    const item = localStorage.getItem(this.STORAGE_KEY);
    if (item) {
      return JSON.parse(atob(item))[fullPath];
    }
  }

  set(root, path, data) {
    const fullPath: any = keyConfig(root, path);
    let payload = {};
    const storage = localStorage.getItem(this.STORAGE_KEY);
    if (storage) {
      payload = this.decode(storage);
      payload[fullPath] = { data: data };
    } else {
      payload = { [fullPath]: { data: data } };
    }

    localStorage.setItem(this.STORAGE_KEY, this.encode(payload));
  }
}

const cache = new StorageCache();

export { cache };
