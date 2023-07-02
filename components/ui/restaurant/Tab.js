import React from 'react'
import Styles from './Tab.module.css'

export default function Tab({
  text1 = '',
  text2 = '',
  text3 = '',
  text4 = '',
  text5 = '',
  text6 = '',
}) {
  return (
    <>
      <div className={Styles.tab_group}>
        <p>{text1}</p>
        <p>{text2}</p>
        <p>{text3}</p>
        <p>{text4}</p>
        <p>{text5}</p>
        <p>{text6}</p>
      </div>
    </>
  )
}
