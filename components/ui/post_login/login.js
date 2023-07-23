import React from 'react'
import Style from './login.module.css'


export default function CommentLogin({goLogin=()=>{}, cancel=()=>{}}) {
  return (
    <div className={Style.frame}>
        <p className={Style.text}>留言需要會員登入，是否要繼續留言?</p>
        <div className={Style.button}>
        <button onClick={goLogin} className={Style.yes}>是</button>
        <button onClick={cancel} className={Style.no}>否</button>
        </div>
    </div>
  )
}
