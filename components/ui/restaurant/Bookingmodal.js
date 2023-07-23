import React, { useState } from 'react';
import Styles from './BookingModal.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function BookingModal() {
  const [modal, setModal] = useState(false);
  const [countPeople, setCountPeople] = useState(1);
  const [countPet, setCountPet] = useState(1);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {/* <MainBtn clickHandler={toggleModal} text="預約的時間區塊" /> */}
      <div className={Styles.time_section}>
        <div className={Styles.booking_card} onClick={toggleModal}>
          <div className={Styles.time_range}>10:00~12:00</div>
          <div className={Styles.rest_people}>
            剩餘<p className={Styles.rest_num}>12</p>人
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
                    <p className={Styles.booking_title}>預約時間</p>
                    <p>2023/08/16 14:00</p>
                  </div>
                  <div className={Styles.member}>
                    <p className={Styles.booking_title}>預約會員</p>
                    <p>王小美</p>
                  </div>
                  <div className={Styles.phone}>
                    <p className={Styles.booking_title}>聯絡資訊</p>
                    <p>0963037941</p>
                  </div>
                </div>
                <div className={Styles.line}></div>
                {/* 人數 */}
                <div className={Styles.detail_qty_area}>
                  <div className={Styles.detail_people_box}>
                    <h5 className={Styles.detail_title}>人數</h5>
                    <div className={Styles.detail_qty}>
                      <button
                        className={Styles.detail_qty_sub_btn}
                        onClick={() => {
                          if (countPeople > 1) {
                            setCountPeople(countPeople - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className={Styles.detail_qty_input}
                        value={countPeople}
                        onChange={(e) => {
                          const reisNumber = /[.\d]/;
                          if (reisNumber.test(e.target.value)) {
                            setCountPeople(parseInt(e.target.value));
                          }
                        }}
                      />
                      <button
                        className={Styles.detail_qty_add_btn}
                        onClick={() => {
                          setCountPeople(countPeople + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 寵物數 */}
                  <div className={Styles.detail_pet_box}>
                    <h5 className={Styles.detail_title}>寵物數</h5>
                    <div className={Styles.detail_qty}>
                      <button
                        className={Styles.detail_qty_sub_btn}
                        onClick={() => {
                          if (countPet > 1) {
                            setCountPet(countPet - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className={Styles.detail_qty_input}
                        value={countPet}
                        onChange={(e) => {
                          const reisNumber = /[.\d]/;
                          if (reisNumber.test(e.target.value)) {
                            setCountPet(parseInt(e.target.value));
                          }
                        }}
                      />
                      <button
                        className={Styles.detail_qty_add_btn}
                        onClick={() => {
                          setCountPet(countPet + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
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
                <MainBtn clickHandler={toggleModal} text="確定" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
