import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Styles from './navbar.module.css';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import NavRoundBtn from '../ui/buttons/NavRoundBtn';
import CloseBtn from '../ui/buttons/closeBtn';
export default function Navbar({ classTitle }) {
  const { auth, logout } = useContext(AuthContext);
  const router = useRouter();
  const [cartItemAmount, setCartItemAmount] = useState(0);
  const [showMemList, setShowMemList] = useState(false);
  const [showCartBox, setShowCartBox] = useState(false);
  const [memProfileImg, setMemProfileImg] = useState('');
  const [login, setLogin] = useState(false);
  const getCartTotalItems = async (id) => {
    const r = await fetch(`${process.env.API_SERVER}/cart-api/count-item`, {
      method: 'POST',
      body: JSON.stringify({ member_sid: id }),
      headers: { 'Content-Type': 'application/json' },
    });
    const itemAmount = await r.json();
    setCartItemAmount(itemAmount.itemInCart);
  };
  const getMemberImage = async (id) => {
    const r = await fetch(`${process.env.API_SERVER}/cart-api/get-mem-img`, {
      method: 'POST',
      body: JSON.stringify({ member_sid: id }),
      headers: { 'Content-Type': 'application/json' },
    });
    const memImg = await r.json();
    setMemProfileImg(memImg.profile);
  };

  useEffect(() => {
    if (auth.token) {
      getCartTotalItems(auth.id);
      getMemberImage(auth.id);
      setLogin(true);
    }
  }, [auth]);

  //若有2. 要改頭相
  //mem btn on click, 開關選項
  //登出狀態＝》選項（登入）
  //登入狀態＝》選項（登出/前往會員頁面）
  const redirectToCart = () => {
    if (auth.token) {
      router.push('/cart');
    } else {
      setShowCartBox(true);
    }
  };
  const memberBtnhandler = () => {
    setShowMemList(!showMemList);
  };
  const toMemberCenter = () => {
    router.push('/member/orderlist');
  };
  const signIntoCart = () => {
    router.push('/cart');
  };
  const signOut = () => {
    logout();
    setShowMemList(false);
    setCartItemAmount(0);
    setLogin(false);
  };
  const closeCartLoginBox = () => {
    setShowCartBox(false);
  };
  return (
    <>
      <header
        className={`${Styles.header} ${
          classTitle === 'bigNone' ? Styles.bigNone : ''
        }`}
      >
        <nav className={Styles.navbar}>
          <div className={Styles.logoMenu}>
            <button className={Styles.navbarToggler}>
              <div className={Styles.line}></div>
            </button>
            <Link href="/">
              <img
                className={Styles.logo}
                src="/layout-images/h-logo.svg"
                alt=""
              />
            </Link>
          </div>
          <div className={Styles.linkMenu}>
            <div className={Styles.linkItem}>
              <Link href="/product" className={Styles.link}>
                商城
              </Link>
            </div>
            <div className={Styles.linkItem}>
              <Link href="/activity" className={Styles.link}>
                活動
              </Link>
            </div>
            <div className={Styles.linkItem}>
              <Link href="/restaurant" className={Styles.link}>
                餐廳
              </Link>
            </div>
            <div className={Styles.linkItem}>
              <Link href="/forum" className={Styles.link}>
                論壇
              </Link>
            </div>
          </div>
          <div className={Styles.iconMenu}>
            <div className={Styles.cartBtn}>
              <NavRoundBtn
                icon="/layout-images/h-cart.png"
                clickHandler={redirectToCart}
              ></NavRoundBtn>
              {cartItemAmount !== 0 && (
                <div className={Styles.cartItemNum} onClick={redirectToCart}>
                  <p>{cartItemAmount}</p>
                </div>
              )}
              {showCartBox && (
                <div className={Styles.alertbox}>
                  <p onClick={signIntoCart}>請登入會員</p>
                  <CloseBtn closeHandler={closeCartLoginBox} />
                </div>
              )}
            </div>

            <div className={Styles.memBtn}>
              <NavRoundBtn
                icon="/layout-images/h-user.png"
                clickHandler={memberBtnhandler}
              ></NavRoundBtn>
              {login && showMemList && (
                <div className={Styles.memList}>
                  <div className={Styles.memListBtn} onClick={toMemberCenter}>
                    會員中心
                  </div>
                  <div className={Styles.memListBtn} onClick={signOut}>
                    登出
                  </div>
                </div>
              )}
              <div className={Styles.alertbox}>
                <p onClick={signIntoCart}>登入</p>
                <CloseBtn closeHandler={closeCartLoginBox} />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
