import React from 'react';
import Styles from './RateStar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function RateStar({ score = '', text = '', display = true }) {
  return (
    <>
      <div className={Styles.rating}>
        {display ? (
          <FontAwesomeIcon
            icon={faStar}
            className={Styles.icon}
            style={{ maxWidth: '18px', maxHeight: '18px' }}
          />
        ) : (
          ''
        )}
        <p className={Styles.rate_score}>{score}</p>
        <p className={Styles.rate_text}>{text}</p>
      </div>
    </>
  );
}
