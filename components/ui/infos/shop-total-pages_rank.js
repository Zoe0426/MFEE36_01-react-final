import React from 'react'
import styles from './shop-total-pages_rank.module.css'
import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space, message } from 'antd'

export default function ShopTotalPagesRank({ totalItems = 0 }) {
  const handleButtonClick = (e) => {
    message.info('Click on left button.')
    console.log('click left button', e)
  }
  const handleMenuClick = (e) => {
    message.info('Click on menu item.')
    console.log('click', e)
  }
  const items = [
    {
      label: '價格由低到高',
      key: '1',
    },
    {
      label: '價格由高到低',
      key: '2',
    },
    {
      label: '最新商品',
      key: '3',
    },
    {
      label: '熱賣商品',
      key: '4',
    },
  ]
  const menuProps = {
    items,
    onClick: handleMenuClick,
  }

  return (
    <div className={styles.total_pages_rank}>
      <div>
        <p>商品搜尋結果</p>
        <p>共{totalItems}項商品</p>
      </div>
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            排序
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  )
}
