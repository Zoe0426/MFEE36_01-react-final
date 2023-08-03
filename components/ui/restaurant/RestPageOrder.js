import React from 'react';
import Styles from './RestPageOrder.module.css';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, message, ConfigProvider } from 'antd';

export default function RestPageOrder({
  totalItems = 0,
  onRankChange = () => {},
  orderBy = '',
  items = [],
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
      <div className={Styles.total_pages_rank}>
        <Dropdown menu={menuProps} trigger={['click']}>
          <Button>
            <Space>
              {orderBy}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </ConfigProvider>
  );
}
