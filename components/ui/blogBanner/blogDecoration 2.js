import Image from 'next/image'
import styles from './blogDecoration.module.css'

import walkingDog from '@/assets/walking-dog.svg'
import bgc01 from '@/assets/bgc01.svg'
import trees from '@/assets/trees.svg'

export default function BlogDecoration() {
  return (
    <>
      <div className={styles.head_decoration}>
      <Image src="/forum_img/top-decorate-section.png" width="1920" height='100'/>
      <Image src={walkingDog} alt="" />
      <Image src={trees} alt="" />
      </div>
    </>
  )
}
