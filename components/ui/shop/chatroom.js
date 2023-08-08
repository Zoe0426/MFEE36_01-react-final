import { useRef, useEffect } from 'react';
import styles from './chatroom.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Chatroom({
  auth = { nickname: '' },
  chatroomDatas = [{ sender: '', message: '', time: '' }],
  inputText = '',
  username = '',
  changeHandler = () => {},
  keyDownHandler = () => {},
  clickHandler = () => {},
  closeHandler = () => {},
}) {
  const chatroomRef = useRef();

  useEffect(() => {
    // 當 chatroomDatas 更新後，滾動到最底部
    chatroomRef.current.scrollTop = chatroomRef.current.scrollHeight;
  }, [chatroomDatas]);

  return (
    <div className={styles.chatroom_box}>
      <div className={styles.chatroom_head}>
        <h6>狗with貓 線上客服</h6>
        <FontAwesomeIcon
          style={{ maxWidth: '16px', maxHeight: '16px' }}
          icon={faXmark}
          className={styles.btn_clear_text}
          onClick={closeHandler}
        />
      </div>
      <div className={styles.chatroom_textarea} ref={chatroomRef}>
        <ul>
          {chatroomDatas.map((v, i) => {
            return (
              <li
                key={i}
                className={
                  v.message.message.includes('已離開聊天室')
                    ? styles.leave_text
                    : v.message.sender === username
                    ? styles.custom_text
                    : styles.service_text
                }
              >
                {v.message.message.includes('已離開聊天室')
                  ? ''
                  : v.sender !== username && (
                      <div
                        className={
                          i !== 0 && chatroomDatas[i - 1].sender !== username
                            ? `${styles.head_img_no_show} ${styles.order0}`
                            : styles.head_img
                        }
                      >
                        {v.message.img ? (
                          <img
                            src={`${process.env.API_SERVER}/img/${v.message.img}`}
                            alt={v.sender}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faUser}
                            className={styles.default_head}
                          />
                        )}
                      </div>
                    )}
                {!v.message.message.includes('已離開聊天室') && (
                  <span
                    className={
                      v.sender !== username
                        ? `${styles.time} ${styles.order3}`
                        : `${styles.time} ${styles.order0}`
                    }
                  >
                    {v.message.time}
                  </span>
                )}
                <span
                  className={
                    v.sender !== username
                      ? styles.text
                      : `${styles.text} ${styles.bgc}`
                  }
                >
                  {v.message.message}
                </span>
                {v.sender === username && (
                  <div
                    className={
                      i !== 0 && chatroomDatas[i - 1].sender === username
                        ? styles.head_img_no_show
                        : styles.head_img
                    }
                  >
                    {v.message.img ? (
                      <img
                        src={`${process.env.API_SERVER}/img/${v.message.img}`}
                        alt={v.sender}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faUser}
                        className={styles.default_head}
                      />
                    )}
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
