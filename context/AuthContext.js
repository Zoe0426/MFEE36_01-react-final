import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});
export default AuthContext;

export const noLogin = {
  id: '',
  email: '',
  nickname: '',
  token: '',
};

export const AuthContextProvider = function ({ children }) {
  const [auth, setAuth] = useState({ noLogin });
  const [cartItemNum, setCartItemNum] = useState(0);

  const logout = () => {
    localStorage.removeItem('petauth');
    setAuth(noLogin);
    localStorage.removeItem(`${auth.id}cart`);
    setCartItemNum(0);
  };
  //更新NavBar購物車數量(參數: 父編號,子編號,add/remove)
  const updateCart = (relSid, relSeqSid, todo) => {
    const itemID = `${relSid}_${relSeqSid}`;
    const getCart = localStorage.getItem(`${auth.id}cart`);
    const memItems = JSON.parse(getCart);

    if (todo === 'add' && !memItems.includes(itemID)) {
      //加1
      setCartItemNum(cartItemNum + 1);
      memItems.push(itemID);
      localStorage.setItem(`${auth.id}cart`, JSON.stringify(memItems));
    } else if (todo === 'remove') {
      //減1
      setCartItemNum(cartItemNum - 1);
      const newList = memItems.filter((v) => v !== itemID);
      localStorage.setItem(`${auth.id}cart`, JSON.stringify(newList));
    }
  };
  useEffect(() => {
    const str = localStorage.getItem('petauth');
    if (str) {
      try {
        const obj = JSON.parse(str);
        setAuth(obj);
      } catch (ex) {
        ('error');
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, logout, cartItemNum, setCartItemNum, updateCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};
