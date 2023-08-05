import React from 'react';
import styles from './chatroom.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Chatroom({
  chatroomDatas = [{ sender: '', message: '', time: '' }],
  inputText = '',
  changeHandler = () => {},
  keyDownHandler = () => {},
  clickHandler = () => {},
  auth = { nickname: '' },
}) {
  return (
    <div className={styles.chatroom_box}>
      <div className={styles.chatroom_head}>
        <h6>狗with貓 線上客服</h6>
        <FontAwesomeIcon
          style={{ maxWidth: '16px', maxHeight: '16px' }}
          icon={faXmark}
          className={styles.btn_clear_text}
          //   onClick={clearHandler}
        />
      </div>
      <div className={styles.chatroom_textarea}>
        <ul>
          {chatroomDatas.map((v, i) => {
            return (
              <li
                key={i}
                className={
                  v.message.sender === auth.nickname
                    ? styles.custom_text
                    : styles.service_text
                }
              >
                {v.sender === '狗with咪客服' && (
                  <div className={styles.head_img}>
                    <img
                      src={`${process.env.WEB}/product-img/logo-10.png`}
                      alt={auth.profile}
                    />
                  </div>
                )}
                <span className={styles.text}>{v.message.message}</span>

                {v.sender !== '狗with咪客服' && (
                  <div
                    className={
                      i !== 0 && chatroomDatas[i - 1].sender !== '狗with咪客服'
                        ? styles.head_img_no_show
                        : styles.head_img
                    }
                  >
                    <img
                      src={`${process.env.API_SERVER}/img/${auth.profile}`}
                      alt="serviceHead"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.sending_box}>
        <textarea
          name="chatroomText"
          value={inputText}
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
        />
        <button onClick={clickHandler}>傳送</button>
      </div>
    </div>
  );
}
