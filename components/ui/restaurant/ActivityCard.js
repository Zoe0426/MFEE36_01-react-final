import React from 'react';
import Styles from './ActivityCard.module.css';

export default function ActivityCard({
  img = '',
  title = '',
  date = '',
  activity_info = '',
}) {
  return (
    <>
      <div className="container-inner">
        <div className={Styles.feature_card}>
          <div className={Styles.feature_decorate}>
            <img src={img} alt="" />
          </div>
          <div className={Styles.feature_info}>
            <h2 className={Styles.jill_h2}>{title}</h2>
            <div className={Styles.activity_date}>
              <h3 className={Styles.jill_h3}>活動日期: </h3>
              <h3 className={Styles.jill_h3}>{date}</h3>
            </div>
            <p className={Styles.information}>{activity_info}</p>
          </div>
        </div>
      </div>
    </>
  );
}
