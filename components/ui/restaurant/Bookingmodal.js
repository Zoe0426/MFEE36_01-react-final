import React, { useState } from 'react';
import Styles from './Bookingmodal.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import NumberInput from '../numberInput/numberInput2';
import Confirm from './confirm';

export default function BookingModal({
  datas = [],
  memberDatas = [],
  clickHandler = () => {},
  time,
  people,
  handleNoteChange = () => {},
  handleChangePeople = () => {},
  handleChangePet = () => {},
  noteValue = '',
  countPeople = 1,
  countPet = 1,
}) {
  const [modal, setModal] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false); // 新增狀態來控制預約成功的彈跳視窗
  // const [countPeople, setCountPeople] = useState(1);
  // const [countPet, setCountPet] = useState(1);
  // const [noteValue, setNoteValue] = useState('');

  // const handleNoteChange = (event) => {
  //   console.log('備註');
  //   setNoteValue(event.target.value);
  // };

  const toggleModal = () => {
    //setModal(!modal);
    const newModal = !modal;
    // console.log(newModal);
    setModal(newModal);
    if (newModal) {
      document.body.classList.add('likeList-open');
    } else {
      document.body.classList.remove('likeList-open');
    }
  };

  // const handleChangePeople = (newCount) => {
  //   // 在這裡處理人數的變更，不執行 handleSubmit
  //   console.log('人數');
  //   setCountPeople(newCount);
  // };

  // const handleChangePet = (newCount) => {
  //   // 在這裡處理寵物數量的變更，不執行 handleSubmit
  //   console.log('寵物');
  //   setCountPet(newCount);
  // };

  const restPeople = datas.remaining_slots;

  //日期格式轉換回來
  const dateStr = datas.date;
  const [monthDay, weekday] = dateStr.split(' (');
  const [month, day] = monthDay.split('/');
  const [, weekdayStr] = weekday.split(')');
  const weekdayNum = ['日', '一', '二', '三', '四', '五', '六'].indexOf(
    weekdayStr
  );
  const year = 2023;
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
    2,
    '0'
  )}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 建立要傳遞到後端的預約資料物件
    const reservationData = {
      rest_sid: datas.rest_sid,
      section_code: datas.section_code,
      date: formattedDate,
      member_sid: memberDatas.member_sid,
      people_num: countPeople,
      pet_num: countPet,
      note: noteValue,
      rest_name: datas.name,
      member_name: memberDatas.name,
      member_mobile: memberDatas.mobile,
      date_time: datas.time,
    };

    // 發送 POST 請求到後端 API
    try {
      const response = await fetch(
        `${process.env.API_SERVER}/restaurant-api/booking_modal`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        //跳一個預約成功的視窗
        setReservationSuccess(true);
      } else {
        console.error('處理預約失敗的情況');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          {/* <div onClick={toggleModal} className={Styles.overlay}></div> */}
          <div className={Styles.overlay}></div>
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
                    <p className={Styles.date_time}>
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
                    <div className={Styles.input_height}>
                      <NumberInput
                        title="人數"
                        needMax={true}
                        maxValue={datas.remaining_slots}
                        handleNumber={handleChangePeople}
                      />
                    </div>
                  </div>

                  {/* 寵物數 */}
                  <div className={Styles.detail_pet_box}>
                    <NumberInput
                      title="寵物數"
                      handleNumber={handleChangePet}
                    />
                  </div>
                </div>
                <div className={Styles.note}>
                  <label htmlFor="" className={Styles.note_content}>
                    備註
                  </label>
                  <input
                    type="text"
                    className={Styles.note_input}
                    value={noteValue}
                    onChange={handleNoteChange}
                  />
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
                <MainBtn clickHandler={handleSubmit} text="預約" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
