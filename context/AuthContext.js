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
  const logout = () => {
    localStorage.removeItem('petauth');
    setAuth(noLogin);
  };

  useEffect(() => {
    const str = localStorage.getItem('petauth');
    if (str) {
      try {
        const obj = JSON.parse(str);
        setAuth(obj);
      } catch (ex) {
        ('reeor');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
