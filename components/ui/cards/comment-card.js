import styles from './comment-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';

export default function CommentCard({
  date = '',
  rating = 0,
  content = '',
  name = '',
  profile = null,
  clickHandler = () => {},
}) {
  const ratingArr = [];
  for (let i = 1; i <= 5; i++) {
    if (parseInt(rating) >= i) {
      profile;
      ratingArr.push(true);
    } else {
      ratingArr.push(false);
    }
  }
  return (
    <div className={styles.comment_card} onClick={clickHandler}>
      <div className={styles.card_head}>
        <div>
          {profile ? (
            <img
              src={`${process.env.API_SERVER}/img/${profile}`}
              alt={profile}
            />
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
