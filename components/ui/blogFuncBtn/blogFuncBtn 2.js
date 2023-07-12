import React from 'react'
import Style from './blogFuncBtn.module.css'

export default function BlogFuncBtn({img='', func=''}) {
  return (
    <div className={Style.funcBtn}>
      <img src={img}/>
      <div>{func}</div>
    </div>
  )
}
