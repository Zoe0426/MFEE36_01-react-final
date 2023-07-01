import React from 'react'
import Styles from './RateStarPill.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function RateStarPill({ score = '' }) {
  return (
    <>
      <p className={Styles.rating}>
        <FontAwesomeIcon icon={faStar} className={Styles.icon} />
        <p className={Styles.rate_score}>{score}</p>
      </p>
    </>
  )
}
