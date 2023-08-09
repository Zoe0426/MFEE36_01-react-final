import { useState } from 'react';
import style from './cartTab.module.css';
import MainBtn from '../buttons/MainBtn';
import SecondaryBtn from '../buttons/SecondaryBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import CartAlertContent from './cartAlertContent';

export default function CartTab({
  type = '',
  text = '',
  checkoutType = '',
  shopData = [],
  activityData = [],
  changeTypeHandler = () => {},
  title = '  溫馨提醒  ',
  mainBtnText = '確認',
  subBtnText = '返回',
}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    console.log(shopData);
    const shopSelectStatus =
      shopData.filter((v) => v.selected == true).length > 0;
    //console.log({ shopSelectStatus });
    const actSelectStatus =
      activityData.filter((v) => v.selected == true).length > 0;
    //console.log({ actSelectStatus });

    if (type !== checkoutType) {
      if (type === 'shop') {
        //現在COtype 是activity
        console.log({ actSelectStatus });
        if (actSelectStatus) {
          setModal(!modal);
          document.body.classList.add('likeList-open');
        } else {
          changeTypeHandler('shop');
        }
      }
      if (type === 'activity') {
        //現在COtype 是shop
        console.log({ shopSelectStatus });
        if (shopSelectStatus) {
          setModal(!modal);
          document.body.classList.add('likeList-open');
        } else {
          changeTypeHandler('activity');
        }
      }
    }
  };
  const closeHandler = () => {
    setModal(false);
    document.body.classList.remove('likeList-open');
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
                {/* <FontAwesomeIcon
                  icon={faPaw}
                  style={{
                    maxHeight: 16,
                    maxWidth: 16,
                    transform: 'rotate(-15deg)',
                    color: '#FFD4C0',
                    marginRight: '16px',
                  }}
                /> */}
                {title}
                {/* <FontAwesomeIcon
                  icon={faPaw}
                  style={{
                    maxHeight: 16,
                    maxWidth: 16,
                    transform: 'rotate(15deg)',
                    color: '#FFD4C0',
                    marginLeft: '16px',
                  }}
                /> */}
              </h2>
              <div className={style.modal_content}>
                <CartAlertContent
                  contentP1={`更換結帳種類後，將會重置所選之${
                    checkoutType === 'shop' ? '商品' : '活動'
                  }`}
                  contentP2={`您要前住${
                    checkoutType === 'shop' ? '活動' : '商品'
                  }結帳嗎？`}
                />
              </div>
              <div className={style.btn_group}>
                <SecondaryBtn text={subBtnText} clickHandler={closeHandler} />
                <MainBtn clickHandler={confirmHandler} text={mainBtnText} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
