import React from 'react';
import Styles from './LocationCard.module.css';

export default function LocationCard({
  rest_image = '',
  location = '',
  clickHandler = () => {},
}) {
  return (
    <>
      <div className={Styles.location}>
        <div className={Styles.location_img} onClick={clickHandler}>
          <img src={rest_image} alt="rest_image" />
        </div>
        <p className={Styles.location_name}>{location}</p>
      </div>
    </>
  );
}
