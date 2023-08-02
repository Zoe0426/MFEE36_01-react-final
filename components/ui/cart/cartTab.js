import { useState } from 'react';
import style from './cartTab.module.css';
import MainBtn from '../buttons/MainBtn';
import SecondaryBtn from '../buttons/SecondaryBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { check } from 'prettier';

export default function CartTab({
  type = '',
  text = '',
  checkoutType = '',
  shopData = [],
  activityData = [],
  changeTypeHandler = () => {},
  title = '  溫馨提醒  ',
  showSubBtn = true,
  mainBtnText = '確認',
  subBtnText = '返回',
}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    console.log(shopData);
    const shopSelectStatus =
      shopData.filter((v) => v.selected == true).length > 0;
    console.log({ shopSelectStatus });
    const actSelectStatus =
      activityData.filter((v) => v.selected == true).length > 0;
    console.log({ actSelectStatus });

    if (type !== checkoutType) {
      if (type === 'shop') {
        //現在COtype 是activity
        console.log({ actSelectStatus });
        if (actSelectStatus) {
          setModal(!modal);
        } else {
          changeTypeHandler('shop');
        }
      }
      if (type === 'activity') {
        //現在COtype 是shop
        console.log({ shopSelectStatus });
        if (shopSelectStatus) {
          setModal(!modal);
        } else {
          changeTypeHandler('activity');
        }
      }
    }
  };
  const confirmHandler = () => {
    checkoutType === 'shop'
      ? changeTypeHandler('activity')
      : changeTypeHandler('shop');
  };
  return (
    <div
      onClick={toggleModal}
      className={`${checkoutType === type ? style.typeSelected : style.type}`}
    >
      {text}
      {modal && (
        <>
          <div onClick={toggleModal} className={style.overlay}></div>
          <div className={style.modal}>
            <div className={style.modal_card}>
              <h2 className={style.modal_title}>
                <FontAwesomeIcon
                  icon={faPaw}
                  style={{
                    maxHeight: 16,
                    maxWidth: 16,
                    transform: 'rotate(-15deg)',
                    color: '#FFD4C0',
                    marginRight: '16px',
                  }}
                />
                {title}
                <FontAwesomeIcon
                  icon={faPaw}
                  style={{
                    maxHeight: 16,
                    maxWidth: 16,
                    transform: 'rotate(15deg)',
                    color: '#FFD4C0',
                    marginLeft: '16px',
                  }}
                />
              </h2>
              <div className={style.modal_content}>
                <div className={style.box}>
                  <img
                    src="/home-images/h-logo.png"
                    alt="logo"
                    className={style.img}
                  />
                  <div className={style.message}>
                    <p>前往活動結帳頁面？</p>
                    <p></p>
                  </div>
                </div>
              </div>

              <div className={style.line}></div>
              <div className={style.btn_group}>
                {showSubBtn && (
                  <SecondaryBtn text={subBtnText} clickHandler={toggleModal} />
                )}
                <MainBtn clickHandler={confirmHandler} text={mainBtnText} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
