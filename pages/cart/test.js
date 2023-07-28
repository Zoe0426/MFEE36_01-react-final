import React from 'react';
import { useState } from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

export default function Test() {
  const [obText, setText] = useState('熱門文章');
  const handleMenuClick = (e) => {
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page: 1,
        orderBy: key,
      }).toString()}`
    );
    message.info('Click on menu item.');
    console.log('click', e);
    console.log('e.key', e.key);
  };
  const items = [
    {
      label: '熱門文章',
      key: 'postLike',
    },
    {
      label: '最新文章',
      key: 'post_date',
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
          {obText}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}
