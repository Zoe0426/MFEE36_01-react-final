import React from 'react'
import Styles from './NotionAreaBgc.module.css'
import Image from 'next/image'
import topAreaBgc from '@/assets/top_area_bgc.svg'
import cans from '@/assets/cans.svg'
import tree from '@/assets/tree.svg'

export default function NotionAreaBgc() {
  return (
    <>
      <div className={Styles.top_area_bgc}>
        <Image src={topAreaBgc} />
        <Image src={cans} />
        <Image src={tree} />
      </div>
    </>
  )
}