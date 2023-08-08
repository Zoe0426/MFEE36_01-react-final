import { useState, useEffect, Fragment } from 'react';
import Styles from './rest_card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import HashTag from '../hashtag/hashtag';
import RateStarPill from '../rateStar/RateStarPill';
import Link from 'next/link';
import AlertModal from '@/components/ui/restaurant/AlertModal';

export default function RestCard({
  rest_sid = '',
  image = '',
  name = '',
  city = '',
  area = '',
  rule_names = '',
  service_names = '',
  average_friendly = '',
  like = false,
  token = '',
  singinHandler = () => {},
  clickHandler = () => {},
}) {
  const rules = rule_names.split(',');
  const services = service_names.split(',');
  // console.log(rest_sid);
  // console.log(average_friendly);

  return (
    <>
      {token ? (
        <FontAwesomeIcon
          icon={faHeart}
          onClick={clickHandler}
          className={`${Styles.icon_heart} ${like && Styles.active}`}
        />
      ) : (
        <AlertModal
          btnType="heart"
          title="貼心提醒"
          content="收藏餐廳"
          mainBtnText="前往登入"
          subBtnText="暫時不要"
          confirmHandler={singinHandler}
        />
      )}

      <Link href={`${process.env.WEB}/restaurant/${rest_sid}`}>
        <div className={Styles.card}>
          <div className={Styles.rest_img}>
            <img src={image} alt="rest_image" />
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
