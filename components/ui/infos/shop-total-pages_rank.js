import { useState } from 'react';
import styles from './shop-total-pages_rank.module.css';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, ConfigProvider } from 'antd';

export default function ShopTotalPagesRank({
  totalItems = 0,
  onRankChange = () => {},
  orderBy = '',
  items = [],
  searchText = [],
}) {
  const menuProps = {
    items,
    onClick: onRankChange,
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: '#909090',
          colorPrimary: '#909090',
          colorBgContainer: 'rgba(255,255,255,0.8)',
          borderRadius: 10,
          controlHeight: 50,
          fontSize: 16,
          borderRadiusOuter: 10,
        },
      }}
    >
      <div className={styles.total_pages_rank}>
        <div>
          <h4>{`${
            searchText[1].text.split('> ')[1].split('列表')[0]
          }搜尋結果`}</h4>
          <p>( 共{totalItems}項商品 )</p>
        </div>
        <div className={styles.total_pages_order_title}>
          <p>排 序 :</p>
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button>
              <Space>
                {orderBy}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
    </ConfigProvider>
  );
}
