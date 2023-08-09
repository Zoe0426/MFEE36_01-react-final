import React, { useState } from 'react';
import Styles from './cartPayBtn.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import CartAlertContent from './cartAlertContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
export default function CartPayBtn({
  btnType = 'main',
  btnText = '點我展開modal', // 選點了展開modal的Btn文字內容
  title = '標題', //Modal標題
  mainBtnText = '確認', //確認btn的文字
  subBtnText = '取消', //取消btn的文字
  showSubBtn = true, //是否需要顯示取消的按鈕
  confirmHandler = () => {},
}) {
  const [modal, setModal] = useState(false);

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  const confirmBtn = () => {
    confirmHandler();
    setModal(!modal);
  };
  const toggleModal = () => {
    const newShowLikeList = !modal;
    setModal(newShowLikeList);
    if (newShowLikeList) {
      document.body.classList.add('likeList-open');
    } else {
      document.body.classList.remove('likeList-open');
    }
  };
  return (
    <>
      {btnType === 'main' ? (
        <MainBtn clickHandler={toggleModal} text={btnText} />
      ) : (
        <span onClick={toggleModal} className={Styles.edit}>
          {btnText}
        </span>
      )}

      {modal && (
        <>
          <div onClick={toggleModal} className={Styles.overlay}></div>
          <div className={Styles.modal}>
            <div className={Styles.modal_card}>
              <h2 className={Styles.modal_title}>
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
              <div className={Styles.modal_content}>
                <CartAlertContent
                  // h2title=""
                  contentP1="本訂單之商品及使用的優惠券"
                  contentP2="將會從購物車移除，可於會員中心查看"
                />
              </div>

              {/* <div className={Styles.line}></div> */}
              <div className={Styles.btn_group}>
                {showSubBtn && (
                  <SecondaryBtn text={subBtnText} clickHandler={toggleModal} />
                )}
                <MainBtn clickHandler={confirmBtn} text={mainBtnText} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
