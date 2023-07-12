import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Styles from './RestTitle.module.css'

export default function RestTitle({ icon = '', text = '' }) {
  return (
    <>
      <div className={Styles.group}>
        <div className={Styles.explore_title}>
          <FontAwesomeIcon icon={icon} className={Styles.title_icon} />
          <h2 className={Styles.jill_h2}>{text}</h2>
        </div>
        <div className={Styles.show_more}>
          <p className={Styles.more_text}>顯示更多</p>
          <FontAwesomeIcon icon={faArrowLeft} className={Styles.arrow} />
          <FontAwesomeIcon icon={faArrowRight} className={Styles.arrow} />
        </div>
      </div>
    </>
  )
}
