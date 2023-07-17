import React, { useState } from 'react';
import Styles from './modal.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';

export default function Modal({
  btnType = 'main', //選點了展開modal的Btn類型，目前只有main(MainBtn)跟text(純文字)兩種
  btnText = '點我展開modal', // 選點了展開modal的Btn文字內容
  title = '標題', //Modal標題
  mainBtnText = '確認', //確認btn的文字
  subBtnText = '取消', //取消btn的文字
  content = <></>,
  confirmHandler = () => {},
}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const confirmBtn = () => {
    confirmHandler();
    setModal(!modal);
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
              <h2 className={Styles.modal_title}>{title}</h2>
              <div className={Styles.modal_content}>{content}</div>

              <div className={Styles.line}></div>
              <div className={Styles.btn_group}>
                <SecondaryBtn text={subBtnText} clickHandler={toggleModal} />
                <MainBtn clickHandler={confirmBtn} text={mainBtnText} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
