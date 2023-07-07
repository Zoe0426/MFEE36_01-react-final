import React from 'react';
import Styles from './LocationCard.module.css';

export default function LocationCard({ rest_image = '', location = '' }) {
  return (
    <>
      <div className={Styles.location}>
        <div className={Styles.location_img}>
          <img src={rest_image} alt="" />
        </div>
        <p className={Styles.location_name}>{location}</p>
      </div>
    </>
  );
}
