import React from 'react';
import style from './cartpostinfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPhone,
  faUser,
  faEnvelope,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';

export default function CartPostInfo({
  addressSid = '',
  storeName = '',
  address = '',
  name = '',
  mobile = '',
  email = '',
  selected = false,
  postType,
  edit = false,
}) {
  let img = '';
  if (postType === 1) {
    img = '/cart_img/c-blackcat.jpeg';
  } else if (postType === 2) {
    img = '/cart_img/c-7Eleven.png';
  } else if (postType === 3) {
    img = '/cart_img/c-family.jpeg';
  }
  return (
    <div className={style.box}>
      <div className={style.details}>
        <p>
          <span className={style.icon}>
            <FontAwesomeIcon
              icon={faUser}
              style={{ maxWidth: '20px', maxHeight: '20px' }}
            />
          </span>
          <span>{name}&nbsp;&nbsp;&nbsp;&nbsp;</span>

          <span className={style.icon}>
            <FontAwesomeIcon
              icon={faPhone}
              style={{ maxWidth: '20px', maxHeight: '20px' }}
            />
          </span>
          <span>{mobile}</span>
        </p>

        <p>
          <span className={style.icon}>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ maxWidth: '20px', maxHeight: '20px', fontSize: '16px' }}
            />
          </span>

          <span>
            {address}&nbsp;&nbsp;&nbsp;{storeName}
          </span>
        </p>
        <p>
          <span className={style.icon}>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ maxWidth: '20px', maxHeight: '20px' }}
            />
          </span>
          {email}
        </p>
        <p>
          <span className={style.icon}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ maxWidth: '20px', maxHeight: '20px' }}
            />
          </span>
          預計到貨&nbsp;&nbsp;
          <span>6月8日&nbsp;&nbsp;-&nbsp;&nbsp;6月16日</span>
        </p>
      </div>
      <div>
        <img src={img} alt="" className={style.postTypeImg} />
      </div>
    </div>
  );
}
