import React from 'react'
import Styles from './RateStarPill.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function RateStarPill({ score = '' }) {
  return (
    <>
      <div className={Styles.rating}>
        <FontAwesomeIcon icon={faStar} className={Styles.icon} />
        <span className={Styles.rate_score}>{score}</span>
      </div>
    </>
  )
}
