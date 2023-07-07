import React from 'react';
import Styles from './IconBtn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//要引入fontawesome的icon需要在你們的page檔icon的props裡加上花括號，並於最上面引入要用的icon名稱(不用再引入FontAwesomeIcon了)

export default function IconBtn({ icon = '', text = '' }) {
  return (
    <>
      <button className={Styles.icon_btn}>
        <FontAwesomeIcon icon={icon} className={Styles.icon} />
        <p className={Styles.icon_text}>{text}</p>
      </button>
    </>
  );
}