import React from 'react';
import Link from 'next/link';
import styles from './breadcrumb.module.css';

export default function BreadCrumb({ breadCrubText = [] }) {
  return (
    <ol className={styles.breadcrumb}>
      {breadCrubText.map((v) => {
        return (
          v.show && (
            <li key={v.id}>
              {v.href ? <Link href={v.href}> {v.text}</Link> : v.text}
            </li>
          )
        );
      })}
    </ol>
  );
}
