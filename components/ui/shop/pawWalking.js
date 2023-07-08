import React from 'react';
import styles from './pawWalking.module.css';
import BGCustomWaveDecoration from '@/components/ui/decoration/bg-custom-wave-decoration';
import manyTrees from '@/assets/manytrees.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

export default function PawWalking() {
  return (
    <div className={styles.pawPath}>
      <BGCustomWaveDecoration
        upperwave="#F7ECE3"
        downwave="#FFFAF6"
        rightPic={manyTrees}
      />
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
  );
}
