import {useState} from 'react';
import styles from './shop-total-pages_rank.module.css';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, message, ConfigProvider } from 'antd';

export default function ShopTotalPagesRank({ totalItems = 0 }) {
  const [orderBy, setOrderBy]=useState(3)
  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };
  const handleMenuClick = ({ key }) => {
    message.info('Click on menu item.'+key);
    // console.log('click', e);
  };
  const items = [
    {
      label: '價格由低到高',
      key: '1',
      value:'price_ASC'
    },
    {
      label: '價格由高到低',
      key: '2',
      value:'price_DESC'
    },
    {
      label: '最新商品',
      key: '3',
      value:'shelfDate_DESC'
    },
    {
      label: '熱賣商品',
      key: '4',
      value:'shelfDate_DESC'
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
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
          <h4>商品搜尋結果</h4>
          <p>( 共{totalItems}項商品 )</p>
        </div>
        <Dropdown menu={menuProps} onClick={handleButtonClick}>
          <Button>
            <Space>
              排序方式
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </ConfigProvider>
  );
}
