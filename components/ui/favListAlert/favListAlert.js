import React, { useState } from 'react';
import Style from './favListAlert.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import IconBtn from '@/components/ui/buttons/IconBtn';
import IconSeconBtn from '@/components/ui/buttons/IconSeconBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons';
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
  color="",
  Fav,
  setFav=()=>{},
  inputText = '',
  content = <></>,
  confirmHandler = () => {},
  menuProps = () => {},
  obText = ''

}) {
  const [modal, setModal] = useState(false);
  const [listText, setListText] = useState('');

  const toggleModal = () => {
    console.log(Fav);
    if(Fav){
        confirmHandler(listText);
        // 刪除收藏
        setFav(false);
    }else{
        setModal(!modal);

    }
  };
  const cancelAddFav = () => {
    setModal(!modal);

  }

  const confirmBtn = () => {
    confirmHandler(listText);
    setModal(!modal);
     setFav(true);
  };
  const [inputList, setInputList] = useState(false);
  const plus = () => {
    console.log("plus")
    setInputList(!inputList);
  }

  const getInput = (e) => {
    console.log(e.target.value);
    setListText(e.target.value);
    console.log("listText",listText);

  }

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
          className={Fav ? Style.favoriteGreen : Style.favoriteGray}
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
              <div className={Style.list}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FD8C46',
                    colorText: 'rgb(81, 81, 81)',
                    colorTextPlaceholder: '#DDDDDD',
                    controlOutline: 'transparent',
                    fontSize: 16,
                    controlInteractiveSize: 16,
                  },
                }}
              >
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    {obText}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              </ConfigProvider>
              { !inputList && (<FontAwesomeIcon icon={faPlus} onClick={plus} className={Style.plus}/>)}
              </div>
              { inputList && (
                <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FD8C46',
                    colorText: 'rgb(81, 81, 81)',
                    colorTextPlaceholder: '#DDDDDD',
                    controlOutline: 'transparent',
                    fontSize: 16,
                    controlInteractiveSize: 16,
                  },
                }}
              >
                <div className={Style.input}>
                  <Input className={Style.inputBlock} placeholder={inputText} onChange={getInput}/>
                </div>
              </ConfigProvider>
              )
              }
              <div className={Style.line}></div>
              <div className={Style.btn_group}>
                {showSubBtn && (
                  <div className={Style.cancel}>
                    <SecondaryBtn text={subBtnText} clickHandler={cancelAddFav} />
                  </div>
                )}
                <div className={Style.cancel}>
                  <MainBtn clickHandler={confirmBtn} text={mainBtnText} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
