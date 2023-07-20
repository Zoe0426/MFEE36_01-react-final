import React from 'react';
import style from './cartpostinfo.module.css';

export default function CartPostInfo({
  recipient = '',
  recipient_phone = '',
  post_type = '',
  post_address = '',
  post_store_name = '',
}) {
  return (
    <div className={style.postDetails}>
      <div className={style.postTo}>
        <div className={style.detail}>
          <p className={style.detailtitle}>收件人</p>
          <p>: &nbsp;&nbsp;{recipient}</p>
        </div>
        <div className={style.detail}>
          <p className={style.detailtitle}>聯絡電話</p>
          <p>: &nbsp;&nbsp;{recipient_phone}</p>
        </div>
        <div className={style.detail}>
          <p className={style.detailtitle}>成立時間</p>
          <p>: &nbsp;&nbsp;2023-06-12 16:32</p>
        </div>
      </div>
      <div className={style.postAdd}>
        <div className={style.detail}>
          <p className={style.detailtitle}>運送方式</p>
          <p>: &nbsp;&nbsp;{post_type}</p>
        </div>
        <div className={style.detail}>
          <p className={style.detailtitle}>運送地址</p>
          <p>
            : &nbsp;&nbsp;{post_address}&nbsp;&nbsp;
            {post_type !== '黑貓宅急便' ? post_store_name : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
