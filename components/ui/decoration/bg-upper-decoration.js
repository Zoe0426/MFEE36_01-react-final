import Image from 'next/image';
import styles from './bg-upper-decoration.module.css';

import walkingDog from '@/assets/walking-dog.svg';
import bgc01 from '@/assets/bgc01.svg';
import trees from '@/assets/trees.svg';

export default function BGUpperDecoration() {
  return (
    <div className={styles.head_decoration}>
      <Image src={bgc01} alt="background" />
      <Image src={walkingDog} alt="walkingDog" />
      <Image src={trees} alt="trees" />
    </div>
  );
}
