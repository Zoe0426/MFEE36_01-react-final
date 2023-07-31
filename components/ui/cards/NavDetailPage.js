import React, { useRef } from 'react';
import styles from './NavDetailPage.module.css';

const NavDetailPage = ({ items, handleClick }) => {
  return (
    <div className={styles.underline_nav}>
      {items.map((item, index) => (
        <p
          key={index}
          className={styles.nav_item}
          onClick={() => handleClick(item.targetRef)}
        >
          {item.text}
        </p>
      ))}
    </div>
  );
};

export default NavDetailPage;
