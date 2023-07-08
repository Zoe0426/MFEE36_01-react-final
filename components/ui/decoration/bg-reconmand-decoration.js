import Image from 'next/image';
import styles from './bg-middle-decoration.module.css';

import StretchDog from '@/assets/stretch-dog.svg';
import wave from '@/assets/bgc02-wave.svg';
import trees from '@/assets/trees.svg';

export default function BGMiddleDecoration() {
  return (
    <div className={styles.head_decoration}>
      <Image src={wave} alt="" />
      <Image src={trees} alt="" />
      <Image src={StretchDog} alt="" />
    </div>
  );
}
