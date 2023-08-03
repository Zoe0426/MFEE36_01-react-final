import Image from 'next/image';
import styles from './bg-middle-decoration.module.css';

import StretchDog from '@/assets/stretch-dog.svg';
import wave from '@/assets/bgc02-wave.svg';
import trees from '@/assets/trees.svg';

export default function BGRecomandDecoration() {
  return (
    <div className={styles.head_decoration}>
      <Image src={wave} alt="wave" />
      <Image src={trees} alt="trees" />
      <Image src={StretchDog} alt="StretchDog" />
    </div>
  );
}
