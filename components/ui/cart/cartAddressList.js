import { useState } from 'react';
import { Radio, ConfigProvider } from 'antd';
import style from './cartAddressList.module.css';
import CartPostInfo from './cartpostinfo';
import Modal from '../modal/modal';

export default function CartAddressList({
  postAddData = [],
  setPostAddData = () => {},
}) {
  //sortData
  const selectedListType = postAddData.filter((v) => v.selected === true)[0]
    .post_type;
  const originalSelectedSid = postAddData.filter((v) => v.selected === true)[0]
    .address_sid;
  const blackCatData = postAddData.filter((v) => v.post_type === 1);
  const sevenData = postAddData.filter((v) => v.post_type === 2);
  const familyData = postAddData.filter((v) => v.post_type === 3);

  //setData
  const [listType, setListType] = useState(selectedListType);
  const [mapData, setMapData] = useState(
    selectedListType === 1
      ? blackCatData
      : selectedListType === 2
      ? sevenData
      : familyData
  );
  const [editModal, setEditModal] = useState(
    selectedListType === 1 ? <></> : selectedListType === 2 ? <></> : <></>
  );
  const [selectedAddress, setSelectedAddress] = useState(originalSelectedSid);

  //functions
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    // setSelectedAddress(e.target.value);
    // setPostAddData(e.target.value);
  };
  console.log(selectedAddress);
  const changePostTypeList = (type) => {
    setListType(type);
    if (type === 1) {
      setMapData(blackCatData);
      setEditModal(<></>);
    } else if (type === 2) {
      setMapData(sevenData);
      setEditModal(<></>);
    } else if (type === 3) {
      setMapData(familyData);
      setEditModal(<></>);
    }
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FD8C46',
          fontSize: 18,
        },
      }}
    >
      <div className={style.tabs}>
        <div
          className={`${
            listType !== 1 ? style.postTypeTab : style.postTypeTabSelected
          }`}
          onClick={() => {
            changePostTypeList(1);
          }}
        >
          <img src="/cart_img/c-blackcat2.png" alt="blackCat" />
        </div>
        <div
          className={`${
            listType !== 2 ? style.postTypeTab : style.postTypeTabSelected
          }`}
          onClick={() => {
            changePostTypeList(2);
          }}
        >
          <img src="/cart_img/c-7Eleven.png" alt="7-11" />
        </div>
        <div
          className={`${
            listType !== 3 ? style.postTypeTab : style.postTypeTabSelected
          }`}
          onClick={() => {
            changePostTypeList(3);
          }}
        >
          <img src="/cart_img/c-family2.png" alt="familymart" />
        </div>
      </div>
      <Radio.Group
        onChange={onChange}
        value={selectedAddress}
        className={style.radioGroup}
      >
        {mapData.length > 0 ? (
          mapData.map((v) => {
            return (
              <Radio
                value={v.address_sid}
                key={v.address_sid}
                className={style.radio}
              >
                <div
                  style={{
                    paddingLeft: '16px',
                    width: '100%',
                  }}
                >
                  <CartPostInfo
                    key={v.address_sid}
                    addressSid={v.address_sid}
                    storeName={v.store_name}
                    address={v.city + v.area + v.address}
                    name={v.recipient}
                    mobile={v.recipient_phone}
                    email={v.email}
                    selected={v.selected}
                    postType={v.post_type}
                    edit={true}
                    forModal={true}
                  />
                </div>
              </Radio>
            );
          })
        ) : (
          <p>無相關地址</p>
        )}
      </Radio.Group>
      <Modal
        btnType="text"
        btnText="+ 新增地址"
        title="請輸入地址"
        mainBtnText="儲存地址"
        content={editModal}
      />
    </ConfigProvider>
  );
}
