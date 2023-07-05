import React from 'react'
import subBtn from '@/assets/subBtn.svg'
import Image from 'next/image'
export default function SubBtn({ img = '', text = '' }) {
  return (
    <>
      <div>
        <Image src={subBtn}></Image>
        {/* <div>
          <img src={img} alt="icon" />
          <p>{text}</p>
        </div> */}
      </div>
    </>
  )
}
