import Image from 'next/image'
import styles from './bg-new-decoration.module.css'

import flags from '@/assets/two-flags.svg'
import wave from '@/assets/bgc02-wave.svg'

export default function BGMNewDecoration() {
  return (
    <div className={styles.head_decoration}>
      <Image src={wave} alt="wave" />
      <Image src={flags} alt="flags" width={250} />
      <Image src={flags} alt="flags" width={250} />
    </div>
  )
}
