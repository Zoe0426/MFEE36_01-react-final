import { useEffect, useState } from 'react'
import CommentCard from '@/components/ui/cards/comment-card'
import BGMiddleDecoration from '@/components/ui/decoration/bg-middle-decoration'
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb'

import styles from '@/styles/shop.module.css'
import { Row } from 'antd'

export default function Product() {
  const [datatForProduct, setDataForProduct] = useState([])
  const [dataForComment, setDataForComment] = useState([])

  //麵包屑寫得有點奇怪...
  const [breadCrubText, setBreadCrubText] = useState([
    { id: 'shop', text: '商城', href: './', show: true },
    { id: 'search', text: '/ 飼料', href: './cid', show: true },
    {
      id: 'pid',
      text: '希爾思-雞肉、大麥與糙米特調食譜(小型及迷你幼犬)',
      href: '',
      show: true,
    },
  ])

  useEffect(() => {
    ;(async function getData() {
      //拿回15張評價卡片資訊
      const res_comment = await fetch(
        'http://localhost:3002/shop-api/comment/CFCA0002',
        {
          method: 'GET',
        }
      )
      const commentDatas = await res_comment.json()

      setDataForComment(commentDatas)

      //拿回特定商品的相關資訊
      const res_productInfo = await fetch(
        'http://localhost:3002/shop-api/product/DFFE0004',
        { method: 'GET' }
      )
      const { shopMainData, shopDetailData, allImg, allPrice } =
        await res_productInfo.json()
      // setDataForProduct(productDatas)
    })()
  }, [])
  return (
    <>
      <div className="outer-container">
        <div className="container-inner">
          {/* 麵包屑這邊需要再修改 */}
          <div className={styles.nav_head}>
            <BreadCrumb breadCrubText={breadCrubText} />
            <div className={styles.btns}>
              <button>收藏列表</button>
              <button>進階篩選</button>
            </div>
          </div>
          <section className={styles.product_detail_main_box}>
            <div>照片</div>
            <div>商品資訊</div>
          </section>
        </div>
      </div>

      <BGMiddleDecoration />
      <div className="container-outer">
        <div className="container-inner">
          <div className={styles.comment_section}>
            <div className={styles.comment_cards}>
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
