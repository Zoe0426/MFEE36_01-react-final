import React from 'react';
import style from './cartpostinfo.module.css';

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
  return (
    <div className={style.info}>
      <div className={style.details}>
        <p>
          <span>{name}&nbsp;&nbsp;&nbsp;</span>
          <span>{mobile}&nbsp;&nbsp;&nbsp;</span>
        </p>
        <p>email:{email}</p>
        <p>
          收入地址：
          <span>
            {address}&nbsp;&nbsp;&nbsp;{storeName}
          </span>
        </p>
        <p>
          預計到貨時間&nbsp;&nbsp;
          <span>6月8日&nbsp;&nbsp;-&nbsp;&nbsp;6月16日</span>
        </p>
      </div>
      <div>
        <span className={style.postPrice}>
          ${postType == 1 ? 90 : 60}&nbsp;&nbsp;
        </span>
        {edit && <span className={style.edit}>編輯</span>}
      </div>
    </div>
  );
}
