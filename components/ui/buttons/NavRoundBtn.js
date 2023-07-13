import React from 'react';
import styles from './NavRoundBtn.module.css';
import Link from 'next/link';

export default function NavRoundBtn({ icon, link }) {
  console.log(icon);
  console.log(link);

  return (
    <Link href={link}>
      <div className={styles.roundBtn}>
        <img src={icon} className={styles.rbIcon} alt="" />
      </div>
    </Link>
  );
}
