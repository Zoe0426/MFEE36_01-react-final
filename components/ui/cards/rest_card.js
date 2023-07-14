import { useState, useEffect, Fragment } from 'react';
import Styles from './rest_card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import HashTag from '../hashtag/hashtag';
import RateStarPill from '../rateStar/RateStarPill';

export default function RestCard({
  image = '',
  name = '',
  city = '',
  area = '',
  rule_names = '',
  service_names = '',
}) {
  const rules = rule_names.split(',');
  const services = service_names.split(',');
  return (
    <>
      <div className={Styles.card}>
        <div className={Styles.rest_img}>
          <img src={image} alt="rest_image" />
          <FontAwesomeIcon icon={faHeart} className={Styles.icon_inImage} />
        </div>
        <h3 className={Styles.rest_name}>{name}</h3>

        <div className={Styles.rest_title}>
          <p className={Styles.rest_location}>
            {city}‧{area}
          </p>
          <RateStarPill score="4.8" />
        </div>
        <div className={Styles.hash_tag_group}>
          {rules.map((v1, i1) => {
            return <HashTag key={i1} text={v1} />;
          })}
          {services.map((v2, i2) => {
            return <HashTag key={i2} text={v2} />;
          })}
        </div>
      </div>
    </>
  );
}
