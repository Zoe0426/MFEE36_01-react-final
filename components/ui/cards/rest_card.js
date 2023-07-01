import React from 'react'
import Styles from './rest_card.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import HashTag from '../hashtag/HashTag'
import RateStarPill from '../rateStar/RateStarPill'

export default function RestCard({
  image = '',
  name = '',
  city = '',
  location = '',
}) {
  return (
    <>
      <div className={Styles.card}>
        <div className={Styles.rest_img}>
          <img src={image} alt="" />
          <FontAwesomeIcon icon={faHeart} className={Styles.icon_inImage} />
        </div>
        <h3 className={Styles.rest_name}>{name}</h3>

        <div className={Styles.rest_title}>
          <p className={Styles.rest_location}>
            {city} ‧ {location}
          </p>
          <RateStarPill score="4.8" />
        </div>
        <div className={Styles.hash_tag_group}>
          <HashTag text="免費水" />
          <HashTag text="有賣食物" />
          <HashTag text="可放繩" />
        </div>
      </div>
    </>
  )
}
