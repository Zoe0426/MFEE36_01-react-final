import styles from './comment-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';

export default function CommentCard({
  member_sid = '',
  date = '',
  rating = 0,
  content = '',
  name = '',
  profile = null,
}) {
  const ratingArr = [];
  for (let i = 1; i <= 5; i++) {
    if (parseInt(rating) >= i) {
      ratingArr.push(true);
    } else {
      ratingArr.push(false);
    }
  }
  return (
    <div className={styles.comment_card}>
      <div className={styles.card_head}>
        <div>
          {profile ? (
            <img src={`/product-img/${profile}`} alt="" />
          ) : (
            <FontAwesomeIcon icon={faUser} className={styles.default_head} />
          )}
        </div>
        <div>
          <p className={styles.user_name}>{name}</p>
          <div>
            {ratingArr.map((v, i) => {
              return (
                <FontAwesomeIcon
                  icon={faStar}
                  key={i}
                  className={
                    v ? styles.star_icon_yellow : styles.star_icon_normal
                  }
                />
              );
            })}
          </div>
          <p className={styles.comment_date}>{date}</p>
        </div>
      </div>
      <div className={styles.card_body}>
        <p className={styles.card_content}>{content}</p>
      </div>
    </div>
  );
}
