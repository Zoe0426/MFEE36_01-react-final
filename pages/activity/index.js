import styles from '../../styles/activityindex.module.css'

import ActivityCard1 from '@/components/ui/cards/ActivityCard1'
import ActivityCard2 from '@/components/ui/cards/ActivityCard2'
import ActivityCard3 from '@/components/ui/cards/ActivityCard3'

export default function ActivityHome() {
  return (
    <div>
      {/* .........banner......... */}
      <div className={styles.banner}>
        <img
          className={styles.banner_pic}
          src="/activity_img/index_banner.jpg"
          alt="banner"
        />
      </div>

      {/* .........收藏列表/進階篩選 btn......... */}
      <div className={styles.selector}></div>

      {/* .........分類bar......... */}
      <div className={styles.type}></div>

      {/* .........section1......... */}
      <div className={styles.section1}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>TOP 4 熱門活動</p>
          </div>
          <div className={styles.section_card}>
            <ActivityCard1 /> <ActivityCard1 />
          </div>
          <div className={styles.section_card}>
            <ActivityCard1 /> <ActivityCard1 />
          </div>
        </div>
      </div>

      {/* .........銜接處圖片1......... */}
      <img src="/activity_img/index_bg_1.jpg" alt="Activity" />

      {/* .........section2......... */}
      <div className={styles.section2}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>本月最新活動</p>
          </div>
          <div className={styles.section_card}>
            <ActivityCard1 /> <ActivityCard1 />
          </div>
          <div className={styles.section_card}>
            <ActivityCard1 /> <ActivityCard1 />
          </div>
        </div>
      </div>

      {/* .........銜接處圖片2......... */}
      <img src="/activity_img/index_bg_2.jpg" alt="Activity" />

      {/* .........section3......... */}
      <div className={styles.section3}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>探索熱門城市</p>
          </div>
          <div className={styles.section_card}>
            <ActivityCard2 /> <ActivityCard2 /> <ActivityCard2 />
          </div>
          <div className={styles.section_card}>
            <ActivityCard2 /> <ActivityCard2 /> <ActivityCard2 />
          </div>
        </div>
      </div>

      {/* .........銜接處圖片3......... */}
      <img src="/activity_img/index_bg_3.jpg" alt="Activity" />

      {/* .........section4......... */}
      <div className={styles.section4}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>會員願望投票區</p>
          </div>
          <div className={styles.section_card}>
            <ActivityCard3 /> <ActivityCard3 /> <ActivityCard3 />
          </div>
          <div className={styles.section_card}>
            <ActivityCard3 /> <ActivityCard3 /> <ActivityCard3 />
          </div>
        </div>
      </div>
    </div>
  )
}
