import React from 'react';
import styles from './NavRoundBtn.module.css';
import Link from 'next/link';

export default function NavRoundBtn({ icon, link }) {
  return (
    <div className={styles.roundBtn}>
      <Link href={link}>
        <img src={icon} className={styles.rbIcon} alt="" />
      </Link>
    </div>
  );
}
