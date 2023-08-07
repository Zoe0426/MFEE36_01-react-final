import React from 'react';
import styles from './ActivityLikeListCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays,faLocationDot,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const ActivityLikeListCard = ({
    datas = [], //需要渲染的陣列資料
    token = '',
    removeLikeListItem = () => {}, //用來清除某一項蒐藏清單的函式
    closeLikeList = () => {}, //前往某一項商品細節頁時，收藏列表需要關閉
  }) => {
    const router = useRouter();
    return datas.map((v) => {
      const { activity_sid, activity_pic, name, recent_date, farthest_date, city, area, price_adult } = v;
      const pic = (activity_pic && activity_pic[0]) || <>placeholder</>;
      return (
        <div className={styles.card} key={activity_sid}>
            <div>
                <FontAwesomeIcon
                    icon={faTrashCan}
                    className={styles.trash_icon}
                    onClick={() => {
                    removeLikeListItem(activity_sid, token);
                    }}
                />
            </div>
          {/* -------左邊------- */}
          <div 
          role="presentation"
          className={styles.left}>
            <img
            src={`/activity_img/${pic}`}
            alt="activity" 
            className={styles.image} 
            onClick={() => {
              closeLikeList();
              router.push(`${process.env.WEB}/activity/${activity_sid}`);
            }}
            />
          </div>
  
          {/* -------右邊------- */}
          <div className={styles.right} role="presentation"
           onClick={() => {
            closeLikeList();
            router.push(`${process.env.WEB}/activity/${activity_sid}`);
          }}
          >
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
