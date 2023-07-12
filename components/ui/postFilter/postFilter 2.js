import React from 'react'
import Styles from './postFilter.module.css'

export default function PostFilter({optionCh='', op1='', op2=''}) {
  return (
    <>
    <select name="" id="" className={Styles.filter}>
        <option className={Styles.option} value="1">{optionCh}</option>
        <option className={Styles.option} value="2">{op1}</option>
        <option className={Styles.option} value="3">{op2}</option>
    </select>
    </>
  )
}
