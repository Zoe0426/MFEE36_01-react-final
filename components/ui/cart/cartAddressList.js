import { useState } from 'react';
import { Radio, ConfigProvider } from 'antd';
import style from './cartAddressList.module.css';
import CartPostInfo from './cartpostinfo';
import CartNewAddressForm from './cartNewAddressForm';
import Modal from '../modal/modal';

export default function CartAddressList({
  postAddData = [],
  setPostAddData = () => {},
  postType = 1,
  setPostType = () => {},
}) {
  //sortData
  const selectedPostType = postAddData.filter((v) => v.selected === true)[0]
    .post_type;
  const originalSelectedSid = postAddData.filter((v) => v.selected === true)[0]
    .address_sid;
  const blackCatData = postAddData.filter((v) => v.post_type === 1);
  const sevenData = postAddData.filter((v) => v.post_type === 2);
  const familyData = postAddData.filter((v) => v.post_type === 3);

  //setData
  const [mapData, setMapData] = useState(
    selectedPostType === 1
      ? blackCatData
      : selectedPostType === 2
      ? sevenData
      : familyData
  );
  const [editModal, setEditModal] = useState(
    selectedPostType === 1 ? <></> : selectedPostType === 2 ? <></> : <></>
  );
  const [selectedAddSid, setselectedAddSid] = useState(originalSelectedSid);

  //functions
  const onChange = (e) => {
    const newData = postAddData.map((v) =>
      v.address_sid === e.target.value
        ? { ...v, selected: true }
        : { ...v, selected: false }
    );
    setselectedAddSid(e.target.value);
    setPostAddData(newData);
    const selectedType = newData.filter((v) => v.selected === true)[0]
      .post_type;
    setPostType(selectedType);
  };

  const changePostTypeList = (type) => {
    setPostType(type);
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
            postType !== 1 ? style.postTypeTab : style.postTypeTabSelected
          }`}
          onClick={() => {
            changePostTypeList(1);
          }}
        >
          <img src="/cart_img/c-blackcat2.png" alt="blackCat" />
        </div>
        <div
          className={`${
            postType !== 2 ? style.postTypeTab : style.postTypeTabSelected
          }`}
          onClick={() => {
            changePostTypeList(2);
          }}
        >
          <img src="/cart_img/c-7Eleven.png" alt="7-11" />
        </div>
        <div
          className={`${
            postType !== 3 ? style.postTypeTab : style.postTypeTabSelected
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
        value={selectedAddSid}
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
      <div className={style.addNewAddBtn}>
        <Modal
          btnType="text"
          btnText="+ 新增地址"
          title="請輸入地址"
          mainBtnText="儲存地址"
          content=<CartNewAddressForm />
        />
      </div>
    </ConfigProvider>
  );
}
