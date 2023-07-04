import { useEffect, useState } from 'react'
import CommentCard from '@/components/ui/cards/comment-card'
import BGMiddleDecoration from '@/components/ui/decoration/bg-middle-decoration'

import styles from '@/styles/shop.module.css'
import { Row } from 'antd'

export default function Product() {
  const [dataForComment, setDataForComment] = useState([])

  useEffect(() => {
    ;(async function getData() {
      //拿回汪星人24張卡片資訊
      const res_comment = await fetch(
        'http://localhost:3002/shop-api/comment/CFCA0002',
        {
          method: 'GET',
        }
      )
      const commentDatas = await res_comment.json()

      setDataForComment(commentDatas)
    })()
  }, [])
  return (
    <>
      <BGMiddleDecoration />
      <div className="container-outer">
        <div className="container-inner">
          <div className={styles.comment_section}>
            <div
              className={styles.comment_cards}>
              {dataForComment.map((v) => {
                const {
                  product_comment_sid,
                  member_sid,
                  date,
                  rating,
                  content,
                  name,
                  profile,
                } = v
                return (
                  <CommentCard
                    key={product_comment_sid}
                    member_sid={member_sid}
                    date={date}
                    rating={rating}
                    content={content}
                    name={name}
                    profile={profile}
                  />
                )
              })}
            </div>
            <div className={styles.pet_type_btns}>
              <button className={styles.circle_btn_active}></button>
              <button></button>
              <button></button>
              <button></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
