import React from 'react'
import Style from './login.module.css';
import Image from 'next/image';
import stars from '@/assets/stars.svg';


export default function CommentLogin({goLogin=()=>{}, cancel=()=>{}, text=''}) {
  return (
    <div className={Style.modal_box}>
      <p className={Style.txt}>{text}</p>
      <span className={Style.left}>
        {' '}
        <Image src={stars} alt="stars" width={50} />
      </span>
      <span className={Style.right}>
        {' '}
        <Image src={stars} alt="stars" width={50} />
      </span>
      <div className={Style.button}>
        <button onClick={goLogin} className={Style.yes}>是</button>
        <button onClick={cancel} className={Style.no}>否</button>
        </div>
    </div>
  )
}
