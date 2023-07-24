import { React, useState } from 'react';
import Styles from '@/components/ui/modal/AlertModal.module.css';
import { Badge } from 'antd';
import MainBtn from '../buttons/MainBtn';
import CloseBtn from '../buttons/closeBtn';

export default function AlertModal({
  btnType = 'main', //選點了展開modal的Btn類型，目前只有main(MainBtn)跟text(純文字)兩種
  btnText = '點我展開modal', // 選點了展開modal的Btn文字內容
  title = '標題', //Modal標題
  content = <></>,
  type,
}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const closeHandler = () => {
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
              <div className={Styles.modal_colse}>
                <CloseBtn closeHandler={closeHandler} />
              </div>
              <h2 className={Styles.modal_title}>
                <Badge status={type} className={Styles.badge} />
                {title}
              </h2>
              <div className={Styles.modal_content}>{content}</div>

              <div className={Styles.line}></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
