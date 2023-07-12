import React from 'react';
import Styles from './LocationSearch.module.css';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, message, ConfigProvider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

export default function LocationSearch({ text = '', totalItems = 0 }) {
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
      label: '台北市',
      key: '1',
    },
    {
      label: '桃園市',
      key: '2',
    },
    {
      label: '高雄市',
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
          colorBorder: '#DDDDDD',
          colorPrimary: '#FD8C46',
          colorBgContainer: 'rgba(255,255,255)',
          borderRadius: 10,
          controlHeight: 50,
          fontSize: 16,
          borderRadiusOuter: 10,
        },
      }}
    >
    
      <div className={Styles.total_pages_rank}>
        <div className={Styles.categor_area}>
          <FontAwesomeIcon icon={faPaw} className={Styles.paw} />
          <label className={Styles.labels}>{text}</label>
        </div>
        <div className={Styles.dropdowns}>
          <Dropdown menu={menuProps} className={Styles.city}>
            <Button>
              <Space>
                <p className={Styles.arrow}>城市</p>
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown menu={menuProps} className={Styles.section}>
            <Button>
              <Space>
                <p className={Styles.arrow}>地區</p>
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
    </ConfigProvider>
  );
}
