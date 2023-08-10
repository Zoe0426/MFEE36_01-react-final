import React from 'react';
import MainBtn from '../buttons/MainBtn';
import style from './homeActInfoCard.module.css';
import HashTag from '../hashtag/hashtag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function HomeActInfoCard({
  clickHandler = () => {},
  name = '',
  content = '',
  city = '',
  area = '',
  hashTags = [],
  dayInfo = '',
}) {
  return (
    <div className={style.infoBox}>
      <p className={style.hsubtitle}>
        {name}
        <span className={style.date}>{dayInfo}</span>
      </p>
      <p className={style.hp}>{content}</p>
      <p>
        <span>
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ maxWidth: '20px', maxHeight: '20px', fontSize: '16px' }}
          />
        </span>
        &nbsp;&nbsp;
        <span>
          {city}．{area}
        </span>
      </p>
      <div className={style.hhashes}>
        {hashTags.map((h, i) => {
          return <HashTag key={i} text={`#${h}`} marginB="mb8" />;
        })}
      </div>

      <MainBtn text="我想報名" clickHandler={clickHandler} />
    </div>
  );
}
