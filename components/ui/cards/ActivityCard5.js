import React from 'react'
import styles from './ActivityCard5.module.css'

const ActivityCard5 = () => {
  return (
    <div className={styles.card}>
      {/* -------右邊------- */}
      <div className={styles.left}>
        <img
          src="/activity_img/act1_1.jpg"
          alt="Activity"
          className={styles.image}
        />
        <div className={styles.overlay_left}></div>
        <div className={styles.overlay_right}></div>
        <div className={styles.icon}></div>
      </div>

      {/* -------左邊------- */}
      <div className={styles.right}>
        {/* 第一行 */}
        <div className={styles.row_title}>
          <p className={styles.row_text_title}>2022台北與毛家庭有約</p>
        </div>

        {/* 第二行 */}
        <div className={styles.row}>
          <p className={styles.row_price}>$250/ 大人 $125/ 小孩</p>
        </div>

        {/* 第三行 */}
        <div className={styles.row}>
          <div className={styles.review}>
            <p className={styles.row_text_small}>4.3</p>
            <div className={styles.star_icon}></div>
          </div>

          <div>
            <p className={styles.row_text_small}>(30人參加過)</p>
          </div>
        </div>

        {/* 第四行 */}
        <div className={styles.row}>
          <div className={styles.row_icon}></div>
          <div>
            <p className={styles.row_text_small}>
              2023-04-09(六)~2023-05-09(六)
            </p>
          </div>
        </div>

        {/* 第五行 */}
        <div className={styles.row}>
          <div className={styles.row_icon}></div>
          <div>
            <p className={styles.row_text_small}>13:00-15:00</p>
          </div>
        </div>

        {/* 第六行 */}
        <div className={styles.row}>
          <div className={styles.row_icon}></div>
          <div>
            <p className={styles.row_text_small}>
              台北市大安區大安路一段24巷420號3樓
            </p>
          </div>
        </div>

        {/* 第七行 */}
        <div className={styles.row}>
          <div className={styles.row_date}>
            <p className={styles.row_text_small}>選擇日期：</p>
            <input></input>
          </div>
        </div>

        {/* 第八行 */}
        <div className={styles.ppl_qty}>
          {/* 左邊 */}
          <div>
            <p className={styles.row_text_small}>報名人數：</p>
          </div>

          {/* 右邊 */}
          <div>
            <div>
              <p className={styles.ppl_qty_row}>大人：</p>
              <input className={styles.ppl_qty_row}></input>
            </div>
            <div>
              <p className={styles.ppl_qty_row}>小孩：</p>
              <input className={styles.ppl_qty_row}></input>
            </div>
          </div>
        </div>

        {/* 第九行 */}
        <div className={styles.row}>
          <p className={styles.row_text_small}>總金額：</p>
          <p>$123</p>
        </div>

        {/* 第十行 */}
        <div className={styles.row_btn}>
          <button>加入收藏</button>
          <button>我要報名</button>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard5
