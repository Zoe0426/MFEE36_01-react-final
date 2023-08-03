import styles from './loading.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
export default function Loading() {
  return (
    <div className={styles.box}>
      <div className={styles.centerBox}>
        <img
          className={styles.logo}
          src="/home-images/logoNoText.svg"
          alt="loadingLogo"
        />
        <div className={styles.loadingSection}>
          <img
            className={styles.tree}
            src="/member-center-images/tree.svg"
            alt="loading"
          />
          <img
            className={styles.trafficLight}
            src="/home-images/trafficLight.png"
            alt="loading"
          />

          <p className={styles.loadingText}>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </p>
          <div className={styles.detail_paw_walking_box}>
            <FontAwesomeIcon
              icon={faPaw}
              style={{ maxHeight: 16, maxWidth: 16 }}
              className={styles.detail_paw_up_walking}
            />
            <FontAwesomeIcon
              icon={faPaw}
              style={{ maxHeight: 16, maxWidth: 16 }}
              className={styles.detail_paw_up_walking}
            />
            <FontAwesomeIcon
              icon={faPaw}
              style={{ maxHeight: 16, maxWidth: 16 }}
              className={styles.detail_paw_up_walking}
            />
            <FontAwesomeIcon
              icon={faPaw}
              style={{ maxHeight: 16, maxWidth: 16 }}
              className={styles.detail_paw_up_walking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
