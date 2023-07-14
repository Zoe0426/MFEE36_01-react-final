import React, { useState } from 'react';
import Styles from './popup.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  // if (modal) {
  //   document.body.classList.add('active-modal');
  // } else {
  //   document.body.classList.remove('active-modal');
  // }

  return (
    <>
      <MainBtn clickHandler={toggleModal} text="按我" />

      {modal && (
        <div className={Styles.modal}>
          <div onClick={toggleModal} className={Styles.overlay}></div>
          <div className={Styles.modal_card}>
            <h2 className={Styles.modal_title}>預約資訊</h2>
            <p className={Styles.modal_content}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <div className={Styles.line}></div>
            <div className={Styles.btn_group}>
              <SecondaryBtn text="取消" clickHandler={toggleModal} />
              <MainBtn clickHandler={toggleModal} text="確定" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
