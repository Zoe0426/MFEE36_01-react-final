import React from 'react';
import Styles from './Tab.module.css';

export default function Tab({
  text1 = '',
  text2 = '',
  text3 = '',
  text4 = '',
  text5 = '',
  text6 = '',
}) {
  return (
    <>
      <div className={Styles.tab_group}>
        <p className={Styles.tab}>{text1}</p>
        <p className={Styles.tab}>{text2}</p>
        <p className={Styles.tab}>{text3}</p>
        <p className={Styles.tab}>{text4}</p>
        <p className={Styles.tab}>{text5}</p>
        <p className={Styles.tab}>{text6}</p>
      </div>
    </>
  );
}
