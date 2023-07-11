import React from 'react'
import Styles from './ActivitySecondaryBtn.module.css'

export default function AcitvitySecondaryBtn({ text = '' }) {
  return (
    <>
      <button className={Styles.secondary_btn}>{text}</button>
    </>
  )
}
