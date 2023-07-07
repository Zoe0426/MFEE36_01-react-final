import styles from '../../styles/activitymain.module.css'
import ActivityCard4 from '@/components/ui/cards/ActivityCard4'

export default function ActivityMain() {
  return (
    <div>
      {/* .........banner......... */}
      <div className={styles.banner}></div>

      <div className="container-inner">
        {/* .........小麵包屑+篩選btn+收藏btn......... */}

        {/* .........篩選btn展開......... */}

        {/* .........搜尋結果+篩選btn......... */}
        <div className={styles.quick_selector}>
          <div>
            <p className={styles.text_large}>搜尋活動「游泳課」</p>
            <p>50項活動</p>
          </div>
          <div>
            <button>最新</button>
          </div>
        </div>

        {/* .........section1......... */}
        <div>
          <div className={styles.section_card}>
            <ActivityCard4 /> <ActivityCard4 />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 /> <ActivityCard4 />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 /> <ActivityCard4 />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 /> <ActivityCard4 />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 /> <ActivityCard4 />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 /> <ActivityCard4 />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 /> <ActivityCard4 />
          </div>
        </div>

        {/* .........頁碼......... */}
        <div className={styles.pagination}>
          <p>頁碼</p>
        </div>
      </div>
    </div>
  )
}
