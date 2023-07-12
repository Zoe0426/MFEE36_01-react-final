import React from 'react';
import Styles from './RestPageOrder.module.css';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, message, ConfigProvider } from 'antd';

export default function RestPageOrder({ totalItems = 0 }) {
  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const items = [
    {
      label: '評價高到低',
      key: '1',
    },
    {
      label: '評價低到高',
      key: '2',
    },
    {
      label: '最熱門',
      key: '3',
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
      <div className={Styles.total_pages_rank}>
      
        <Dropdown menu={menuProps}>
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
