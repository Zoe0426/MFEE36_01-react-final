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
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
          </div>
          <div className={styles.section_card}>
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
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
