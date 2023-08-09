import React from 'react';
import Styles from './MiddleAreaBgc.module.css';
import Image from 'next/image';
import topAreaBgc from '@/assets/top_area_bgc.svg';
import dog from '@/assets/dog.svg';
import tree from '@/assets/tree.svg';

export default function MiddleAreaBgc() {
  return (
    <>
      <div className={Styles.top_area_bgc}>
        <Image src={topAreaBgc} alt="topAreaBgc" />
        <Image src={tree} alt="tree" />
        <Image src={dog} alt="dog" />
      </div>
    </>
  );
}
