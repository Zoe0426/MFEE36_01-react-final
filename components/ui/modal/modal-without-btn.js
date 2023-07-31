import React, { useState } from 'react';
import Styles from './modal.module.css';
export default function ModalWithoutBtn({
  title = '', //Modal標題
  content = <></>,
  //   confirmHandler = () => {},
}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  //   const confirmBtn = () => {
  //     confirmHandler();
  //     setModal(!modal);
  //   };

  return (
    <>
      <div onClick={toggleModal} className={Styles.overlay}></div>
      <div className={Styles.modal}>
        <div className={Styles.modal_card}>
          <h2 className={Styles.modal_title}>{title}</h2>
          <div className={Styles.modal_content}>{content}</div>

          {/* <div className={Styles.line}></div> */}
          {/* <div className={Styles.btn_group}>
            {showSubBtn && (
              <SecondaryBtn text={subBtnText} clickHandler={toggleModal} />
            )}
            <MainBtn clickHandler={confirmBtn} text={mainBtnText} />
          </div> */}
        </div>
      </div>
    </>
  );
}
