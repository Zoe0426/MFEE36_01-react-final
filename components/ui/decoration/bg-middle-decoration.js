import Image from 'next/image'
import styles from './bg-middle-decoration.module.css'

import runningDog from '@/assets/running-dog.svg'
import wave from '@/assets/bgc02-wave.svg'
import trees from '@/assets/trees.svg'

export default function BGMiddleDecoration() {
  return (
    <div className={styles.head_decoration}>
      <Image src={wave} alt="" />
      <Image src={trees} alt="" />
      <Image src={runningDog} alt="" />
    </div>
  )
}
