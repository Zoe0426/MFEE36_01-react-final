import React, { useState } from 'react';
import Styles from './modal.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import IconBtn from '@/components/ui/buttons/IconBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Input, ConfigProvider } from 'antd';
export default function Modal({
  btnType = 'main', //選點了展開modal的Btn類型，目前有main(MainBtn)，heart(愛心)、iconBtn(iconBtn)、input(ant d input)、text(純文字)五種
  icon = '', //選擇iconBtn的，請先把要用的icon引入到主頁面，並傳給此參數
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
      ) : btnType === 'heart' ? (
        <FontAwesomeIcon
          icon={faHeart}
          onClick={toggleModal}
          className={Styles.heart}
        />
      ) : btnType === 'iconBtn' ? (
        <IconBtn icon={icon} text={btnText} clickHandler={toggleModal} />
      ) : btnType === 'input' ? (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FD8C46',
              colorText: 'rgb(81, 81, 81)',
              colorTextPlaceholder: '#DDDDDD',
              controlOutline: 'transparent',
              fontSize: 18,
              controlInteractiveSize: 18,
            },
          }}
        >
          <Input placeholder={btnText} onFocus={toggleModal} />
        </ConfigProvider>
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
