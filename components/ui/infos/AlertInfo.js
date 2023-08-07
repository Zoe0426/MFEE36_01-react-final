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
        <div className={Styles.alet_notice}>
          {type === 'success' ? (
            notice
          ) : (
            <>
              <div className="resNotice">
                1. 事先了解店家規範：不論是去任何餐廳都應該先詳細了解店內規範。
                <br />
                2.配合餐廳規範：遵守不同餐廳的寵物規範，避免惡意違規造成店家不好的印象。
                <br />
                3.保護毛兒安全：保護自己與他人毛兒的安全非常重要，攻擊性強的毛兒要加強管控，要摸別人家毛兒之前也要先問過毛爸媽。
                <br />
                4.不影響他人用餐：管控好毛兒吠叫問題，也別讓毛兒四處亂跑（是餐廳友善程度而定），避免影響他人用餐。
                <br />
                5.不共用餐具：為維護他人權益與用餐品質，除非店家有明確說可以，不然別讓毛兒上餐桌，也不要與毛兒共用餐廳餐具。
                <br />
                6.維護環境整潔：自備毛兒坐墊，自行處理毛兒便溺，共同維護環境整潔。
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
