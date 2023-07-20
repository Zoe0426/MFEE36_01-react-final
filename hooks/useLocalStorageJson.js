import { useEffect, useState } from 'react';

export default function useLocalStorageJson(key, init = {}) {
  console.log('key:', key);
  console.log('init:', init);

  const [val, setVal] = useState(init);

  useEffect(() => {
    const str = localStorage.getItem(key);
    let data = {};
    if (str) {
      try {
        data = JSON.parse(str);
      } catch (ex) {}
    }
    setVal(data);
  }, [key]);

  const saveVal = (v) => {
    localStorage.setItem(key, JSON.stringify(v));
    setVal(v);
  };

  return [val, saveVal];
}
