import Image from 'next/image';
import styles from './bg-new-decoration.module.css';

import flags from '@/assets/two-flags.svg';

export default function BGMNewDecoration() {
  return (
    <div className={styles.head_decoration}>
      <div className={styles.wave_box}>
        <svg
          width="1920"
          height="107"
          viewBox="0 0 1920 107"
          fill="#fffaf6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1920 107V7.62939e-06C1854.82 41.4769 1596.74 107.027 1085.83 37.4123C634.975 -24.0186 250.362 38.5087 63.734 68.849C38.8718 72.8909 17.5233 76.3615 0 78.8918V107H1920Z"
            fill="#fffaf6"
          />
        </svg>
      </div>

      <Image src={flags} alt="flags" width={250} />
      <Image src={flags} alt="flags" width={250} />
    </div>
  );
}
