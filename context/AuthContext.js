import { createContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

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

        //解密id
        let petauthId = obj.id;
        petauthId = CryptoJS.AES.decrypt(petauthId, 'GoWithMe').toString(
          CryptoJS.enc.Utf8
        );
        obj.id = petauthId;

        //解密email
        let petauthEmail = obj.email;
        petauthEmail = CryptoJS.AES.decrypt(petauthEmail, 'GoWithMe').toString(
          CryptoJS.enc.Utf8
        );
        obj.email = petauthEmail;

        //解密email
        let petauthNickname = obj.nickname;
        petauthNickname = CryptoJS.AES.decrypt(
          petauthNickname,
          'GoWithMe'
        ).toString(CryptoJS.enc.Utf8);
        obj.nickname = petauthNickname;

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
