import styles from './comment-card-no.module.css';
import Image from 'next/image';
import SorryImg from '@/assets/no_found.svg';

export default function NoCommentCard({ star = 0 }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return (
    <div className={styles.comment_card}>
      <div className={styles.card_head}>
        <Image src={SorryImg} alt="SorryImg" />
      </div>
      {/* <div className={styles.card_body}> */}
      <p className={styles.card_content}>Sorry~尚無{star}顆星的相關評論 !</p>
      {/* </div> */}
    </div>
  );
}
