import React from 'react';
import { Radio, ConfigProvider } from 'antd';
import styles from './ActivityFilter.module.css';
import { useRouter } from 'next/router';

export default function ActivityFilter({
  text = '',
  name = '',
  data = [],
  selectedValue, 
  setSelectedValue,
  filterHandler,
}) {
  const router = useRouter();

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedValue(selectedValue);
  
    const query = {
      ...router.query,
      [name]: selectedValue,
    };
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
  
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FD8C46',
          colorText: 'rgb(81, 81, 81)',
          fontSize: 18,
          controlInteractiveSize: 18,
          lineHeight: 1.8,
        },
      }}
    >
      <div className={styles.filter}>
        <label className={styles.labels}>{text}</label>
        <Radio.Group
          value={selectedValue}
          onChange={handleRadioChange}
        >
          {data.map((item) => (
            <Radio key={item.id} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </ConfigProvider>
  );
}
