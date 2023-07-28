import React, { useState } from 'react';
import Styles from './Bookingmodal.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import NumberInput from '../numberInput/numberInput2';

export default function BookingModal({
  datas = [],
  memberDatas = [],
  clickHandler = () => {},
  time,
  people,
}) {
  const [modal, setModal] = useState(false);
  const [countPeople, setCountPeople] = useState(1);
  const [countPet, setCountPet] = useState(1);

  const toggleModal = () => {
    setModal(!modal);
  };

  const restPeople = datas.remaining_slots;
  console.log(datas);
  console.log(memberDatas);

  return (
    <>
      <div className={Styles.time_section}>
        <div
          onClick={restPeople <= 0 ? null : toggleModal}
          className={
            restPeople <= 0 ? Styles.no_people_card : Styles.booking_card
          }
        >
          <div className={Styles.time_range}>{time}</div>
          <div className={Styles.rest_people}>
            {restPeople <= 0 ? '' : '剩餘'}
            <p
              className={restPeople <= 0 ? Styles.no_rest_num : Styles.rest_num}
            >
              {restPeople <= 0 ? '額滿!' : people}
            </p>
            {restPeople <= 0 ? '' : '位'}
          </div>
        </div>
      </div>
      {modal && (
        <>
          <div onClick={toggleModal} className={Styles.overlay}></div>
          <div className={Styles.modal}>
            <div className={Styles.modal_card}>
              <h2 className={Styles.modal_title}>預約資訊</h2>
              <div className={Styles.modal_content}>
                <div className={Styles.booking_info}>
                  <div className={Styles.time}>
                    <p className={Styles.booking_title}>預約餐廳</p>
                    <p>{datas.name}</p>
                  </div>
                  <div className={Styles.time}>
                    <p className={Styles.booking_title}>預約時間</p>
                    <p>
                      2023/{datas.date} {datas.time}
                    </p>
                  </div>
                  <div className={Styles.member}>
                    <p className={Styles.booking_title}>預約會員</p>
                    <p>{memberDatas.name}</p>
                  </div>
                  <div className={Styles.phone}>
                    <p className={Styles.booking_title}>聯絡資訊</p>
                    <p>{memberDatas.mobile}</p>
                  </div>
                </div>
                <div className={Styles.line}></div>
                {/* 人數 */}
                <div className={Styles.detail_qty_area}>
                  <div className={Styles.detail_people_box}>
                    {/* <h5 className={Styles.detail_title}>人數</h5> */}
                    <div className={Styles.input_height}>
                      <NumberInput
                        title="人數"
                        needMax={true}
                        maxValue={datas.remaining_slots}
                      />
                    </div>
                  </div>

                  {/* 寵物數 */}
                  <div className={Styles.detail_pet_box}>
                    {/* <h5 className={Styles.detail_title}>寵物數</h5> */}
                    <NumberInput title="寵物數" />
                  </div>
                </div>
                <div className={Styles.note}>
                  <label htmlFor="" className={Styles.note_content}>
                    備註
                  </label>
                  <input type="text" className={Styles.note_input} />
                </div>
              </div>
              <FontAwesomeIcon
                icon={faXmark}
                className={Styles.close_modal}
                onClick={toggleModal}
              />
              <div className={Styles.line}></div>
              <div className={Styles.btn_group}>
                <SecondaryBtn text="取消" clickHandler={toggleModal} />
                <MainBtn clickHandler={clickHandler} text="確定" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
