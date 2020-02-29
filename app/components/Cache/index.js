export const saveToCache = (key, val) => {

  if (typeof val === 'object') {
    localStorage.setItem(key, JSON.stringify(val))
  } else {
    localStorage.setItem(key, val);
  }

  setTimeout(() => {
    const cache = localStorage.getItem(key);
    return console.log(`${key} updated in cache`);
  }, 1000);

}

export const getFromCache = key => {
  const val = localStorage.getItem(key);
  return val; // may require JSON.parse if it's being used on an object/stringified json
};

export const removeFromCache = (key) => {
  localStorage.removeItem(key);

  setTimeout(() => {
    const cache = localStorage.getItem(key);
    console.log(`removed ${key} from cache: `, cache);
  }, 1000);
}

export const clearCache = () => localStorage.clear();
