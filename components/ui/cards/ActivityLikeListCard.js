import React from 'react';
import styles from './ActivityLikeListCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays,faLocationDot,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const ActivityLikeListCard = ({
    datas = [], //需要渲染的陣列資料
    removeLikeListItem = () => {}, //用來清除某一項蒐藏清單的函式
  }) => {
    const router = useRouter();
    return datas.map((v) => {
      const { activity_sid, activity_pic, name, recent_date, farthest_date, city, area, price_adult } = v;
      return (
        <div className={styles.card} key={activity_sid}>
            <div>
                <FontAwesomeIcon
                    icon={faTrashCan}
                    className={styles.trash_icon}
                    onClick={() => {
                    removeLikeListItem(activity_sid);
                    }}
                />
            </div>
          {/* -------左邊------- */}
          <div 
          role="presentation"
          className={styles.left}>
            <img
            src={`/activity_img/${activity_pic[0]}`}
            alt="activity" 
            className={styles.image} />
          </div>
  
          {/* -------右邊------- */}
          <div className={styles.right} role="presentation">
            <div className={styles.row}>
              <div className={styles.rowTextTitle}>
                <p>{name}</p>
              </div>
            </div>
  
            <div className={styles.row}>
              <FontAwesomeIcon icon={faCalendarDays} className={styles.row_icon} />
              <div>
                <p>{recent_date}~{farthest_date}</p>
              </div>
            </div>
  
            <div className={styles.row}>
              <FontAwesomeIcon icon={faLocationDot} className={styles.row_icon} />
              <div className={styles.rowTextAddress}>
                <p>{city}{area}</p>
              </div>
            </div>
  
            <div className={styles.row}>
              <p className={styles.row_price}>${price_adult} (大人) ${price_adult / 2} (小孩)</p>
            </div>
          </div>
        </div>
      );
    });
  };
  
export default ActivityLikeListCard
