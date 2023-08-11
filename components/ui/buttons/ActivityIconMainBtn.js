import React from 'react';
import Styles from './ActivityIconMainBtn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//要引入fontawesome的icon需要在你們的page檔icon的props裡加上花括號，並於最上面引入要用的icon名稱(不用再引入FontAwesomeIcon了)

export default function ActivityIconMainBtn({
  icon = '',
  text = '',
  clickHandler = () => {},
  hasVoted=''
}) {
  return (
    <>
     <button
        className={hasVoted ? Styles.icon_btn_voted : Styles.icon_btn}
        onClick={clickHandler}
      >
        <FontAwesomeIcon
          icon={icon}
          className={Styles.icon}
          style={{ maxWidth: '18px', maxHeight: '18px' }}
        />
        {text}
      </button>
    </>
  );
}
