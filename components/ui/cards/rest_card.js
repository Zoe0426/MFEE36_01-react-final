import { useState, useEffect, Fragment } from 'react';
import Styles from './rest_card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import HashTag from '../hashtag/hashtag';
import RateStarPill from '../rateStar/RateStarPill';
import Link from 'next/link';

export default function RestCard({
  rest_sid = '',
  image = '',
  name = '',
  city = '',
  area = '',
  rule_names = '',
  service_names = '',
  average_friendly = '',
}) {
  const rules = rule_names.split(',');
  const services = service_names.split(',');
  console.log(name);
  console.log(average_friendly);

  return (
    <>
      <Link href={`http://localhost:3000/restaurant/${rest_sid}`}>
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
            {average_friendly && <RateStarPill score={average_friendly} />}
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
      </Link>
    </>
  );
}
