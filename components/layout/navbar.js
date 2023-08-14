import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Styles from './navbar.module.css';
import AuthContext from '@/context/AuthContext';
import NavRoundBtn from '../ui/buttons/NavRoundBtn';
import CloseBtn from '../ui/buttons/closeBtn';
import ModalWithoutBtn from '../ui/modal/modal-without-btn';
import Link from 'next/link';
export default function Navbar({ type = '' }) {
  const { auth, logout, cartItemNum, setCartItemNum, photo } =
    useContext(AuthContext);
  const router = useRouter();
  const [showMemList, setShowMemList] = useState(false);
  const [showCartBox, setShowCartBox] = useState(false);
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const [memProfileImg, setMemProfileImg] = useState(
    `${process.env.API_SERVER}/img/default-profile.jpg`
  );
  const [login, setLogin] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const getCartTotalItems = async (id) => {
    const r = await fetch(`${process.env.API_SERVER}/cart-api/count-item`, {
      method: 'POST',
      body: JSON.stringify({ member_sid: id }),
      headers: { 'Content-Type': 'application/json' },
    });
    const itemAmount = await r.json();
    let myItems = [];
    if (itemAmount.length > 0) {
      myItems = itemAmount.rel_sids.split(',');
      localStorage.setItem(`${id}cart`, JSON.stringify(myItems));
    } else {
      localStorage.setItem(`${id}cart`, JSON.stringify(myItems));
    }

    setCartItemNum(itemAmount.totalItem);
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
      setMemProfileImg(`/default-profile.jpg`);
    }
  };
  const signOut = () => {
    logout();
    setShowMemList(false);
    setLogin(false);
    setShowLogoutSuccess(true);
    setTimeout(() => {
      setShowLogoutSuccess(false);
    }, 1500);
  };

  useEffect(() => {
    if (auth.token) {
      getCartTotalItems(auth.id);
      getMemberImage(auth.id);
      setLogin(true);
    }
  }, [auth]);

  //======redirect======
  const redirectToCart = () => {
    setShowLoginBox(false);
    if (auth.token) {
      router.push('/cart');
    } else {
      console.log(!router.pathname.includes('member/sign-in'));
      if (!router.pathname.includes('member/sign-in')) {
        setShowCartBox(true);
      }
    }
  };
  const redirectTo = (where) => {
    console.log({ where });
    router.push(`/${where}`);
  };
  const gohome = () => {
    router.push(`/`);
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
    if (!router.pathname.includes('member/sign-in')) {
      setShowLoginBox(!showLoginBox);
    }
    setShowCartBox(false);
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
            {/* <Link href="/"> */}
            <img
              onClick={(e) => {
                e.preventDefault();
                gohome();
              }}
              className={`${type === 'home' ? Styles.homeLogo : Styles.logo}`}
              src="/layout-images/h-logo.svg"
              alt=""
            />
            {/* </Link> */}
          </div>
          <div
            className={`${Styles.linkMenu} ${isActive ? Styles.active : ''}`}
          >
            <div className={Styles.linkItem}>
              <Link href="/product" className={Styles.link}>
                {/* <div
                className={Styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  redirectTo('product');
                }}
              > */}
                商城
                {/* </div> */}
              </Link>
            </div>
            <div className={Styles.linkItem}>
              <Link href="/activity" className={Styles.link}>
                活動
              </Link>
              {/* <div
                className={Styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  redirectTo('activity');
                  // router.push('/activity');
                  // console.log('act');
                }}
              >
                活動
              </div> */}
            </div>
            <div className={Styles.linkItem}>
              <div
                className={Styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  redirectTo('restaurant');
                }}
              >
                餐廳
              </div>
              {/* <Link href="/restaurant" className={Styles.link}>
                餐廳
              </Link> */}
            </div>
            <div className={Styles.linkItem}>
              <div
                className={Styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  redirectTo('forum');
                }}
              >
                論壇
              </div>
              {/* <Link href="/forum" className={Styles.link}>
                論壇
              </Link> */}
            </div>
          </div>
          <div className={Styles.iconMenu}>
            <div className={Styles.cartBtn}>
              <NavRoundBtn
                icon="/layout-images/h-cart.png"
                clickHandler={redirectToCart}
              ></NavRoundBtn>
              {cartItemNum !== 0 && (
                <div className={Styles.cartItemNum} onClick={redirectToCart}>
                  <p>{cartItemNum}</p>
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
                  <img src={photo} alt="" className={Styles.profileImg} />
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
      {showLogoutSuccess && (
        <ModalWithoutBtn
          text="登出成功，再來唷！"
          img="/member-center-images/Icon/happy.svg"
        />
      )}
    </>
  );
}
