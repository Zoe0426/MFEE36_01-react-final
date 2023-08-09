import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Styles from './RestTitle.module.css';
import Link from 'next/link';

export default function RestTitle({
  icon = '',
  text = '',
  clickHandler1 = '',
  clickHandler2 = '',
  href = '',
}) {
  return (
    <>
      <div className={Styles.group}>
        <div className={Styles.explore_title}>
          <FontAwesomeIcon
            icon={icon}
            className={Styles.title_icon}
            style={{ maxWidth: '45px', maxHeight: '45px' }}
          />
          <h2 className={Styles.jill_h2}>{text}</h2>
        </div>
        <div className={Styles.show_more}>
          <Link href={href}>
            <p className={Styles.more_text}>顯示更多</p>
          </Link>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={Styles.arrow}
            onClick={clickHandler1}
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            className={Styles.arrow}
            onClick={clickHandler2}
          />
        </div>
      </div>
    </>
  );
}
