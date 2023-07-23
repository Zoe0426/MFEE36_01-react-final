import React from 'react';
import Styles from '@/components/ui/infos/AlertInfo.module.css';

export default function AlertInfo({
  notice,
  type,
  date,
  peopleNum,
  petNum,
  phone,
  city,
  area,
  address,
  adultQty,
  childQty,
  sectionTime,
}) {
  return (
    <>
      <div className={Styles.alet_card}>
        <div className={Styles.alet_date}>
          日期 ：<div>{date}</div>
        </div>
        <div className={Styles.alet_time}>
          時間 ：<div>{sectionTime}</div>
        </div>
        {type === 'success' ? (
          <>
            <div className={Styles.alet_adult}>
              大人 ：<div className={Styles.alet_adultQty}>{adultQty}</div>
            </div>
            <div className={Styles.alet_child}>
              小孩 ：<div className={Styles.alet_childQty}>{childQty}</div>
            </div>
          </>
        ) : (
          <>
            <div className={Styles.alet_phone}>
              電話 ：<div>{phone}</div>
            </div>
            <div className={Styles.alet_people}>
              人數 ：<div>{peopleNum}</div>
            </div>
            <div className={Styles.alet_pet}>
              寵物 ：<div>{petNum}</div>
            </div>
          </>
        )}

        <div className={Styles.alet_place}>
          地點 ：
          <div className={Styles.alet_address}>
            {city}
            {area}
            {address}
          </div>
        </div>
        <div className={Styles.alet_content}>注意事項 ：</div>
        <div className={Styles.alet_notice}>{notice}</div>
      </div>
    </>
  );
}
