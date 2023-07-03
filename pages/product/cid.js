import { useState, useEffect } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import ShopProductCard from '@/components/ui/cards/shop-product-card'
import ShopTotalPagesRank from '@/components/ui/infos/shop-total-pages_rank'
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb'
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration'

import { Pagination } from 'antd'
import { Row } from 'antd'
import styles from '@/styles/shop.module.css'

export default function Catergory() {
  const [datas, setDatas] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, settotalPages] = useState(0)

  //麵包屑寫得有點奇怪...
  const [breadCrubText, setBreadCrubText] = useState([
    { id: 'shop', text: '商城', href: './', show: true },
    { id: 'search', text: '/ 商品列表', href: '', show: true },
    { id: 'pid', text: '', href: '', show: false },
  ])

  useEffect(() => {
    ;(async function getData() {
      const r = await fetch('http://localhost:3002/shop-api/maincard/food', {
        method: 'GET',
      })
      const backDatas = await r.json()
      const { totalRows, cardData } = backDatas
      console.log(cardData)
      setTotalItems(totalRows)
      setDatas(cardData)
      settotalPages(totalPages)
    })()
  }, [])
  return (
    <>
      <DefaultLayout>
        {/* <div className="container-outer"> */}
        <div className={styles.bgc_lightBrown}>
          <nav className="container-inner">
            <div className={styles.search_bar}>
              {/* 這邊應該要改用共用元件 */}
              <input type="text" placeholder="搜尋你愛的東西" />
              <button>找尋商品</button>
            </div>
            <div className={styles.nav_head}>
              <BreadCrumb breadCrubText={breadCrubText} />
              <div className={styles.btns}>
                <button>收藏列表</button>
                <button>進階篩選</button>
              </div>
            </div>
            <div className="filters"></div>
          </nav>
        </div>
        <BGUpperDecoration />
        {/* </div> */}
        {/* <div className="container-outer"> */}
        <main className="container-inner">
          <ShopTotalPagesRank totalItems={totalItems} />
          <Row gutter={[32, 36]} className={styles.cards}>
            {datas.map((v) => {
              const {
                product_sid,
                category_detail_sid,
                for_pet_type,
                name,
                img,
                update_date,
                supplier,
                max_price,
                min_price,
                avg_rating,
              } = v
              return (
                <ShopProductCard
                  key={product_sid}
                  category_detail_sid={category_detail_sid}
                  for_pet_type={for_pet_type}
                  name={name}
                  img={img}
                  update_date={update_date}
                  supplier={supplier}
                  max_price={max_price}
                  min_price={min_price}
                  avg_rating={avg_rating}
                  col={6}
                  xs={12}
                />
              )
            })}
          </Row>
        </main>
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            total={totalItems}
            pageSize={16}
            showSizeChanger={false}
          />
        </div>
        {/* </div> */}
      </DefaultLayout>
    </>
  )
}
