import { useEffect, useState } from 'react';
import styles from '@/styles/cartTest.module.css';
//import PawWalking from '@/components/ui/shop/pawWalking';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
export default function Test() {
  return (
    <div className={styles.box}>
      <img className={styles.logo} src="/layout-images/h-logo.svg" alt="" />
      <div className={styles.loadingSection}>
        <div className={styles.detail_paw_walking_box}>
          <FontAwesomeIcon
            icon={faPaw}
            className={styles.detail_paw_up_walking}
          />
          <FontAwesomeIcon
            icon={faPaw}
            className={styles.detail_paw_up_walking}
          />
          <FontAwesomeIcon
            icon={faPaw}
            className={styles.detail_paw_up_walking}
          />
          <FontAwesomeIcon
            icon={faPaw}
            className={styles.detail_paw_up_walking}
          />
          <FontAwesomeIcon
            icon={faPaw}
            className={styles.detail_paw_up_walking}
          />
        </div>
      </div>
    </div>
  );
}
