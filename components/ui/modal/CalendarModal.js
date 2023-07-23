import React from 'react';
import Styles from '@/components/ui/modal/Calendar.module.css';
import { Badge } from 'antd';

export default function CalendarModal({
  name,
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
      <div className={Styles.overlay}></div>
      <div className={Styles.modal}>
        <div className={Styles.modal_card}>
          <h2 className={Styles.modal_title}>
            <Badge status={type} text={name} />
          </h2>

          <div className={Styles.modal_date}>
            {date}
            <div className={Styles.modal_time}>{sectionTime}</div>
          </div>
          <div className={Styles.modal_adult}>
            大人 ：<div className={Styles.modal_adultQty}>{adultQty}</div>
          </div>
          <div className={Styles.modal_child}>
            小孩 ：<div className={Styles.modal_childQty}>{childQty}</div>
          </div>
          <div className={Styles.modal_place}>
            地點 ：
            <div className={Styles.modal_address}>
              {city}
              {area}
              {address}
            </div>
          </div>
          <div className={Styles.modal_content}>注意事項 ：</div>
          <div className={Styles.modal_notice}>{notice}</div>
          <div className={Styles.line}></div>
        </div>
      </div>
    </>
  );
}
