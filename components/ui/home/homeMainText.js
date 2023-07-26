import React from 'react';
import style from './homeMainText.module.css';
export default function MainText() {
  return (
    <div className={style.box}>
      <img
        src="/home-images/h-title.png"
        alt="title"
        className={style.baseText}
      />
      <img src="/home-images/text/t1.png" alt="今" className={style.t1} />
      <img src="/home-images/text/t2.png" alt="天" className={style.t2} />
      <img src="/home-images/text/t3.png" alt="你" className={style.t3} />
      <img src="/home-images/text/t4.png" alt="想" className={style.t4} />
      <img src="/home-images/text/t5.png" alt="帶" className={style.t5} />
      <img src="/home-images/text/bt1.png" alt="狗" className={style.bt1} />
      <img src="/home-images/text/bt2.png" alt="咪" className={style.bt2} />
      <img src="/home-images/text/L3t1.png" alt="去" className={style.L3t1} />
      <img src="/home-images/text/L3t2.png" alt="哪" className={style.L3t2} />
      <img src="/home-images/text/L3t3.png" alt="兒" className={style.L3t3} />
      <img src="/home-images/text/L3t4.png" alt="?" className={style.L3t4} />
      <img src="/home-images/h-tree.png" alt="tree" className={style.tree} />
      <img src="/home-images/running-dog.svg" alt="" className={style.dog} />
    </div>
  );
}
