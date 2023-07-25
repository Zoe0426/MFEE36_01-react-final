import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Styles from './navbar.module.css';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import NavRoundBtn from '../ui/buttons/NavRoundBtn';
import CloseBtn from '../ui/buttons/closeBtn';

export default function Navbar({ type = '' }) {
  const { auth, logout } = useContext(AuthContext);
  console.log('auth,navbar:', auth);
  const router = useRouter();
  const [first, setFirst] = useState(false);
  const [cartItemAmount, setCartItemAmount] = useState(0);
  const [showMemList, setShowMemList] = useState(false);
  const [showCartBox, setShowCartBox] = useState(false);
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [memProfileImg, setMemProfileImg] = useState('/product-img/pro001.jpg');
  const [login, setLogin] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const getCartTotalItems = async (id) => {
    console.log('id-countitem', id);
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
    if (memImg.profile) {
      setMemProfileImg(memImg.profile);
    } else {
      setMemProfileImg('/product-img/pro001.jpg');
    }
  };
  const signOut = () => {
    logout();
    setShowMemList(false);
    setCartItemAmount(0);
    setLogin(false);
  };
  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (auth.token && first) {
      getCartTotalItems(auth.id);
      getMemberImage(auth.id);
      setLogin(true);
    }
  }, [auth, first]);

  //======redirect======
  const redirectToCart = () => {
    if (auth.token) {
      router.push('/cart');
    } else {
      setShowCartBox(true);
    }
  };
  const toMemberCenter = () => {
    router.push('/member/orderlist');
  };
  const toSigninPage = () => {
    const from = router.asPath;
    router.push(`/member/sign-in?from=${from}`);
  };
  const signIntoCart = () => {
    router.push('/cart');
  };

  // const toggleLine = document.querySelector('.line');
  // const toggleMenu = document.querySelector('.link-menu');
  // const navbar = document.querySelector('.navbar');
  // toggleLine.addEventListener('click', () => {
  //   toggleLine.classList.toggle('active');
  //   toggleMenu.classList.toggle('active');
  // });
  const handleClick = () => {
    setIsActive(!isActive);
  };

  //=====toggle roundBtn boxes=====
  const closeCartLoginBox = () => {
    setShowCartBox(false);
  };
  const closeLoginBox = () => {
    setShowLoginBox(false);
  };
  const toggleLoginBox = () => {
    setShowLoginBox(!showLoginBox);
  };
  const toggleMemList = () => {
    setShowMemList(!showMemList);
  };
  return (
    <>
      <header
        className={`${type === 'home' ? Styles.homeHeader : Styles.header}`}
      >
        <nav
          className={`${type === 'home' ? Styles.homeNavbar : Styles.navbar}`}
        >
          <div className={Styles.logoMenu}>
            <button className={Styles.navbarToggler} onClick={handleClick}>
              <div
                className={`${Styles.line} ${isActive ? Styles.active : ''}`}
              ></div>
            </button>
            <Link href="/">
              <img
                className={`${type === 'home' ? Styles.homeLogo : Styles.logo}`}
                src="/layout-images/h-logo.svg"
                alt=""
              />
            </Link>
          </div>
          <div
            className={`${Styles.linkMenu} ${isActive ? Styles.active : ''}`}
          >
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
              {!login && (
                <NavRoundBtn
                  icon="/layout-images/h-user.png"
                  clickHandler={toggleLoginBox}
                ></NavRoundBtn>
              )}
              {showLoginBox && (
                <div className={Styles.alertbox}>
                  <p onClick={toSigninPage}>登入</p>
                  <CloseBtn closeHandler={closeLoginBox} />
                </div>
              )}
              {login && (
                <div className={Styles.profileBtn} onClick={toggleMemList}>
                  <img
                    src={memProfileImg}
                    alt="profilePic"
                    className={Styles.profileImg}
                  />
                </div>
              )}
              {showMemList && (
                <div className={Styles.memList}>
                  <div className={Styles.memListBtn} onClick={toMemberCenter}>
                    會員中心
                  </div>
                  <div className={Styles.memListBtn} onClick={signOut}>
                    登出
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
