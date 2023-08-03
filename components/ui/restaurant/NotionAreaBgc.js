import React from 'react';
import Styles from './NotionAreaBgc.module.css';
import Image from 'next/image';
import topAreaBgc from '@/assets/top_area_bgc.svg';
import cans from '@/assets/cans.svg';
import tree from '@/assets/tree.svg';
import catJump from '@/assets/jump_cat.svg';

export default function NotionAreaBgc() {
  return (
    <>
      <div className={Styles.top_area_bgc}>
        <Image src={topAreaBgc} alt="topAreaBgc" />
        <Image src={cans} alt="cans" />
        <Image src={tree} alt="tree" />
      </div>
    </>
  );
}
