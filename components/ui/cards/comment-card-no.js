import styles from './comment-card-no.module.css';
import Image from 'next/image';
import SorryImg from '@/assets/no_found.svg';

export default function NoCommentCard({ star = 0 }) {
  return (
    <div className={styles.comment_card}>
      <div className={styles.card_head}>
        <Image src={SorryImg} alt="SorryImg" />
      </div>
      {/* <div className={styles.card_body}> */}
      <p className={styles.card_content}>
        Sorry~尚無{star === 6 ? '' : `${star}顆星的`}相關評論 !
      </p>
      {/* </div> */}
    </div>
  );
}
