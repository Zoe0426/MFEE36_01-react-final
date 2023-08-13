import { useState, useRef } from 'react';
import { Radio, ConfigProvider } from 'antd';
import style from './cartAddressList.module.css';
import CartPostInfo from './cartpostinfo';
import CartNewAddressForm from './cartNewAddressForm';
import ModalWithoutLine from '../modal/modal-without-line';
import CartNoInfoCard from './cartNoInfoCard';
import ModalWithoutBtn from '../modal/modal-without-btn';
export default function CartAddressList({
  postAddData = [],
  setPostAddData = () => {},
  setPostType = () => {},
  memEmail = '',
}) {
  //sortData
  const myref = useRef(null);
  const selectedPostType = postAddData.filter((v) => v.selected === true)[0]
    .post_type;

  const [inModalPostType, setInModalPostType] = useState(selectedPostType);
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

  const [selectedAddSid, setselectedAddSid] = useState(originalSelectedSid);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showAddFail, setShowAddFail] = useState(false);
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
    setInModalPostType(type);
    if (type === 1) {
      setMapData(blackCatData);
    } else if (type === 2) {
      setMapData(sevenData);
    } else if (type === 3) {
      setMapData(familyData);
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
        const newData = postAddData.filter((v) => v.address_sid !== sid);
        const newMapData = mapData.filter((v) => v.address_sid !== sid);
        const selectedSid = postAddData.filter((v) => v.selected === true)[0]
          .address_sid;
        setMapData(newMapData);
        setPostAddData(newData);
        setselectedAddSid(selectedSid);
      } else {
        //console.log('fail to delete address');
      }
    } catch (er) {
      //console.log(er);
    }
  };
  const scrollToHandler = () => {
    if (myref.current) {
      const rect = myref.current.getBoundingClientRect();
      const offsetTop = rect.top;

      myref.current.parentElement.scrollTo({
        top: offsetTop + myref.current.parentElement.scrollTop,
        behavior: 'smooth',
      });
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
            inModalPostType !== 1
              ? style.postTypeTab
              : style.postTypeTabSelected
          }`}
          onClick={() => {
            changePostTypeList(1);
          }}
        >
          <img src="/cart_img/c-blackcat2.png" alt="blackCat" />
        </div>
        <div
          className={`${
            inModalPostType !== 2
              ? style.postTypeTab
              : style.postTypeTabSelected
          }`}
          onClick={() => {
            changePostTypeList(2);
          }}
        >
          <img src="/cart_img/c-7Eleven.png" alt="7-11" />
        </div>
        <div
          className={`${
            inModalPostType !== 3
              ? style.postTypeTab
              : style.postTypeTabSelected
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
              <div className={style.radioBox} key={v.address_sid}>
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
                      selectedAddSid={selectedAddSid}
                      selected={v.selected}
                      postType={v.post_type}
                      forModal={true}
                    />
                  </div>
                </Radio>
                {v.address_sid !== selectedAddSid && (
                  <div className={style.delete}>
                    <ModalWithoutLine
                      btnType="closeBtn"
                      subBtnText="我再想想"
                      mainBtnText="刪除地址"
                      content="您確定要刪除地址嗎？"
                      confirmHandler={() => {
                        deleteAddress(v.address_sid);
                      }}
                    />
                  </div>
                )}
              </div>
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
          ref={myref}
          onClick={() => {
            setaddNewBox(!addNewBox);
            scrollToHandler();
          }}
        >
          + 新增地址
        </p>
      </div>
      {/* <div className={style.formBox}></div> */}
      {addNewBox && (
        <div className={`${style.formBox} ${addNewBox ? 'active' : ''}`}>
          <CartNewAddressForm
            postType={inModalPostType}
            postAddData={postAddData}
            setaddNewBox={setaddNewBox}
            setPostAddData={setPostAddData}
            setMapData={setMapData}
            setselectedAddSid={setselectedAddSid}
            setShowAddSuccess={setShowAddSuccess}
            setShowAddFail={setShowAddFail}
            memEmail={memEmail}
          />
        </div>
      )}
      {showAddSuccess && (
        <ModalWithoutBtn
          text="新增成功"
          img="/member-center-images/Icon/happy.svg"
        />
      )}
      {showAddFail && (
        <ModalWithoutBtn
          text="新增失敗"
          img="/member-center-images/Icon/happy.svg"
        />
      )}
    </ConfigProvider>
  );
}
