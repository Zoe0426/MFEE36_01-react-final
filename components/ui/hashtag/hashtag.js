import React from 'react';
import Styles from './hashtag.module.css';

export default function HashTag({ text = '', marginB = '' }) {
  return (
    <>
      <p
        className={`${Styles.hash_tag} ${
          marginB === 'mb8' ? Styles.marginB : ''
        }`}
      >
        {text}
      </p>
    </>
  );
}
