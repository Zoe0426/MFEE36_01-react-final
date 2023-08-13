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
  const [first, setFirst] = useState(false);
  const [photo, setPhoto] = useState(
    `${process.env.API_SERVER}/img/default-profile.jpg`
  );

  const logout = () => {
    localStorage.removeItem('petauth');
    localStorage.removeItem(`${auth.id}photoUrl`);
    setAuth(noLogin);
    localStorage.removeItem(`${auth.id}cart`);
    setCartItemNum(0);
  };
  //更新NavBar購物車數量(參數: 父編號,子編號,add/remove)
  const updateCart = (relSid, relSeqSid, todo) => {
    const itemID = `${relSid}_${relSeqSid}`;
    const getCart = localStorage.getItem(`${auth.id}cart`);
    const memItems = JSON.parse(getCart);
    // //console.log(memItems);
    // //console.log(itemID);

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
    setFirst(true);
  }, []);

  useEffect(() => {
    const newPhoto = localStorage.getItem(`${auth.id}photoUrl`);

    if (newPhoto) {
      //console.log('newPhoto', newPhoto);

      const updatePhoto = JSON.parse(newPhoto);
      setPhoto(updatePhoto);
    } else {
      // //console.log('no photo');
    }
  }, [first]);

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
      value={{
        auth,
        setAuth,
        logout,
        cartItemNum,
        setCartItemNum,
        updateCart,
        photo,
        setPhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
