import React from 'react';
import styles from './ActivityLikeListCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCalendarDays,faClock,faLocationDot,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const ActivityLikeListCard = ({
    datas = [], //需要渲染的陣列資料
    //   removeLikeListItem = () => {}, //用來清除某一項蒐藏清單的函式
  }) => {
    const router = useRouter();
    return datas.map((v) => {
      const { activity_sid, activity_pic, title, recent_date, farthest_date, city, area, price_adult } = v;
      return (
        <div className={styles.card} key={activity_sid}>
            <div>
                <FontAwesomeIcon
                    icon={faTrashCan}
                    // className={styles.trash_icon}
                    onClick={() => {
                    removeLikeListItem(product_sid);
                    }}
                />
            </div>
          {/* -------左邊------- */}
          <div className={styles.left}>
            <img src={activity_pic} alt="activity" className={styles.image} />
            <div className={styles.overlay}>
              <span className={styles.text}>{type}</span>
            </div>
            <div className={styles.icon}></div>
          </div>
  
          {/* -------右邊------- */}
          <div className={styles.right}>
            <div className={styles.row}>
              <div className={styles.rowTextTitle}>
                <p className={styles.rowTextLarge}>{title}</p>
              </div>
              <div className={styles.review}>
                <FontAwesomeIcon icon={faStar} className={styles.star_icon} />
                <p className={styles.rowTextLarge}>{rating}</p>
              </div>
            </div>
  
            <div className={styles.row}>
              <FontAwesomeIcon icon={faCalendarDays} className={styles.row_icon} />
              <div>
                <p>{recent_date}~{farthest_date}</p>
              </div>
            </div>
  
            <div className={styles.row}>
              <FontAwesomeIcon icon={faClock} className={styles.row_icon} />
              <div>
                <p>{time}</p>
              </div>
            </div>
  
            <div className={styles.row}>
              <FontAwesomeIcon icon={faLocationDot} className={styles.row_icon} />
              <div className={styles.rowTextAddress}>
                <p>{city}{area}</p>
              </div>
            </div>
  
            <div>
              <p className={styles.row_price}>${price_adult} (大人) ${price_adult / 2} (小孩)</p>
            </div>
          </div>
        </div>
      );
    });
  };
  
export default ActivityLikeListCard
