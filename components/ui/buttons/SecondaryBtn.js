import React from 'react'
import Styles from './SecondaryBtn.module.css'

export default function SecondaryBtn({ text = '' }) {
  return (
    <>
      <button className={Styles.secondary_btn}>{text}</button>
    </>
  )
}
