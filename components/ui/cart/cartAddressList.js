import { useState } from 'react';
import { Radio, ConfigProvider } from 'antd';
import style from './cartAddressList.module.css';
import CartPostInfo from './cartpostinfo';
import CartNewAddressForm from './cartNewAddressForm';
import CloseBtn from '../buttons/closeBtn';
import ModalWithoutLine from '../modal/modal-without-line';
import CartNoInfoCard from './cartNoInfoCard';

export default function CartAddressList({
  postAddData = [],
  setPostAddData = () => {},
  postType = 1,
  setPostType = () => {},
  memEmail = '',
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
  const [addNewBox, setaddNewBox] = useState(false);
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
  const deleteAddress = async (sid) => {
    try {
      const r = await fetch(
        `${process.env.API_SERVER}/cart-api/delete-address`,
        {
          method: 'DELETE',
          body: JSON.stringify({ address_sid: sid }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await r.json();
      if (data.success) {
        //alert('success');
        //TODO: show success card
        const newData = postAddData.filter((v) => v.address_sid !== sid);
        const newMapData = mapData.filter((v) => v.address_sid !== sid);
        const selectedSid = postAddData.filter((v) => v.selected === true)[0]
          .address_sid;
        setMapData(newMapData);
        setPostAddData(newData);
        setselectedAddSid(selectedSid);
      } else {
        console.log('fail to delete address');
      }
    } catch (er) {
      console.log(er);
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
      {mapData.length > 0 ? (
        <Radio.Group
          onChange={onChange}
          value={selectedAddSid}
          className={style.radioGroup}
        >
          {mapData.map((v) => {
            return (
              <>
                <div className={style.radioBox}>
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
                        postType={v.post_type}
                        forModal={true}
                      />
                    </div>
                  </Radio>
                  {v.address_sid !== selectedAddSid && (
                    <div className={style.delete}>
                      <ModalWithoutLine
                        btnType="closeBtn"
                        subBtnText="不要刪除"
                        mainBtnText="刪除地址"
                        content="您確定要刪除地址嗎？"
                        confirmHandler={() => {
                          deleteAddress(v.address_sid);
                        }}
                      />
                    </div>
                  )}
                </div>
              </>
            );
          })}
        </Radio.Group>
      ) : (
        <div className={style.nodataCard}>
          <CartNoInfoCard text="沒有相關地址，您要新增地址嗎？" />
        </div>
      )}
      <div className={style.addNewAddBtn}>
        <p
          onClick={() => {
            setaddNewBox(!addNewBox);
          }}
        >
          + 新增地址
        </p>
      </div>
      {/* <div className={style.formBox}></div> */}
      {addNewBox && (
        <div className={`${style.formBox} ${addNewBox ? 'active' : ''}`}>
          <CartNewAddressForm
            postType={postType}
            postAddData={postAddData}
            setaddNewBox={setaddNewBox}
            setPostAddData={setPostAddData}
            setMapData={setMapData}
            setselectedAddSid={setselectedAddSid}
            memEmail={memEmail}
          />
        </div>
      )}
    </ConfigProvider>
  );
}

// {
//   addressSid !== selectedSid && (
//     <div className={style.delete}>
//       <ModalWithoutLine btnType="closeBtn" />
//       <CloseBtn
//         closeHandler={() => {
//           deleteAddress(addressSid);
//         }}
//       />
//     </div>
//   );
// }
