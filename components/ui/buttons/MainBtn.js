import React from 'react'
import Styles from './MainBtn.module.css'

export default function MainBtn({ text = '' }) {
  return (
    <>
      <button className={Styles.main_btn}>{text}</button>
    </>
  )
}
