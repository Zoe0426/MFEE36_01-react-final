import React from 'react';
import style from './cartblackcatpostinfo.module.css';

export default function CartBlackcatPostInfo({
  address = '',
  name = '',
  mobile = '',
  email = '',
  selected = false,
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
          收入地址：<span>{address}</span>
        </p>
        <p>
          預計到貨時間&nbsp;&nbsp;
          <span>6月8日&nbsp;&nbsp;-&nbsp;&nbsp;6月16日</span>
        </p>
      </div>
      <div>
        <span className={style.postPrice}>$90&nbsp;&nbsp;</span>
        <span className={style.edit}>編輯</span>
      </div>
    </div>
  );
}
