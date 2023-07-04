import React from 'react'
import Styles from './TopAreaBgc.module.css'
import Image from 'next/image'
import topAreaBgc from '@/assets/top_area_bgc.svg'
import cat from '@/assets/cat.svg'
import tree from '@/assets/tree.svg'

export default function TopAreaBgc() {
  return (
    <>
      <div className={Styles.top_area_bgc}>
        <Image src={topAreaBgc} />
        <Image src={cat} />
        <Image src={tree} />
      </div>
    </>
  )
}
