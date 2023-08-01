import React, { useState } from 'react';
import Style from './favListAlert.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import IconBtn from '@/components/ui/buttons/IconBtn';
import IconSeconBtn from '@/components/ui/buttons/IconSeconBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Input, ConfigProvider, Select, Button } from 'antd';
// 下拉選單
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space} from 'antd';
export default function FavListAlert({
  btnType = 'main', //選點了展開modal的Btn類型，目前有main(MainBtn)，heart(愛心)、iconBtn(iconBtn-RWD後只剩icon)、iconSeconBtn(iconSeconBtn-RWD後還有文字)、input(ant d input)、text(純文字)六種
  icon = '', //選擇iconBtn與iconSeconBtn的，請先把要用的icon引入到主頁面，並傳給此參數
  btnText = '點我展開modal', // 選點了展開modal的Btn文字內容
  title = '標題', //Modal標題
  mainBtnText = '確認', //確認btn的文字
  subBtnText = '取消', //取消btn的文字
  showSubBtn = true, //是否需要顯示取消的按鈕
  inputText = '',
  content = <></>,
  confirmHandler = () => {},
  menuProps = () => {},
  obText = '',

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
          className={Style.heart}
        />
      ) : btnType === 'bookmark' ? (
        <FontAwesomeIcon
          icon={faBookmark}
          onClick={toggleModal}
          className={Style.bookmark}
        />
      ) :btnType === 'iconBtn' ? (
        <IconBtn icon={icon} text={btnText} clickHandler={toggleModal} />
      ) : btnType === 'iconSeconBtn' ? (
        <IconSeconBtn icon={icon} text={btnText} clickHandler={toggleModal} />
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
        <span onClick={toggleModal} className={Style.edit}>
          {btnText}
        </span>
      )}

      {modal && (
        <>
          <div onClick={toggleModal} className={Style.overlay}></div>
          <div className={Style.modal}>
            <div className={Style.modal_card}>
              <h2 className={Style.modal_title}>{title}</h2>
              <div className={Style.modal_content}>{content}</div>
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    {obText}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <Input placeholder={inputText}/>
              <div className={Style.line}></div>
              <div className={Style.btn_group}>
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