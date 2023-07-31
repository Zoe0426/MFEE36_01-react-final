import React from 'react';

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
      <div >
        <Dropdown menu={menuProps}>
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
