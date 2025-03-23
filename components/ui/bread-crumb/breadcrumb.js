import React from 'react';
import Link from 'next/link';
import styles from './breadcrumb.module.css';

export default function BreadCrumb({ breadCrumbText = [] }) {
  return (
    <ol className={styles.breadcrumb}>
      {breadCrumbText.map((v) => {
        const itemClassName = v.href ? styles.linked : styles['non-linked'];
        return (
          v.show && (
            <li key={v.id} className={itemClassName}>
              {v.href ? <Link href={v.href}> {v.text}</Link> : v.text}
            </li>
          )
        );
      })}
    </ol>
  );
}
