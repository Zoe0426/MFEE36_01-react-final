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
      value={{ auth, setAuth, logout, cartItemNum, setCartItemNum }}
    >
      {children}
    </AuthContext.Provider>
  );
};
