import React from 'react'
import styles from './ActivityCard4.module.css'

const ActivityCard4 = () => {
  return (
    <div className={styles.card}>
      {/* -------右邊------- */}
      <div className={styles.left}>
        <img
          src="/activity_img/asian-young-girl-holding-kittens-park.jpg"
          alt="Activity"
          className={styles.image}
        />
        <div className={styles.overlay}>
          <p className={styles.text}>市集展覽</p>
        </div>
        <div className={styles.icon}></div>
      </div>

      {/* -------左邊------- */}
      <div className={styles.right}>
        <div className={styles.row}>
          <div className={styles.rowTextTitle}>
            <p className={styles.rowTextLarge}>2022台北與毛家庭有約</p>
          </div>
          <div className={styles.rowText}>
            <p className={styles.rowTextLarge}>4.5</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowIcon}></div>
          <div className={styles.rowText}>
            <p className={styles.rowTextSmall}>2023-04-09~2023-04-09</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowIcon}></div>
          <div className={styles.rowText}>
            <p className={styles.rowTextSmall}>每週六 8:00-18:00</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowTextIntro}>
            <p className={styles.rowTextExtraSmall}>
              寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。
            </p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowIcon}></div>
          <div className={styles.rowTextAddress}>
            <p className={styles.rowTextSmall}>台北市大安區大安路一段</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.feature}>寵物攝影師隨拍</div>
          <div className={styles.feature}>寵物健康餐提供</div>
        </div>
        <div className={styles.row}>
          <div className={styles.feature}>專屬好禮</div>
        </div>
        <div className={styles.row}>
          <p className={styles.rowTextSmall}>$250 (大人) $125 (小孩)</p>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard4
