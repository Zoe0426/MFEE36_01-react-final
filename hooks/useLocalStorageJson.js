import { useEffect, useState } from 'react';

export default function useLocalStorageJson(key, init = {}, isArr = false) {
  const [val, setVal] = useState(init);

  useEffect(() => {
    const str = localStorage.getItem(key);
    let data;
    if (!isArr) {
      data = {};
    } else {
      data = [];
    }
    if (str) {
      try {
        data = JSON.parse(str);
      } catch (ex) {
        console.log(ex);
      }
    }
    setVal(data);
  }, [key]);

  const saveVal = (v) => {
    localStorage.setItem(key, JSON.stringify(v));
    setVal(v);
  };

  return [val, saveVal];
}
