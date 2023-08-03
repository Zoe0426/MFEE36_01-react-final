import React, { useState } from 'react';
import { Radio, ConfigProvider } from 'antd';
import styles from './ActivityFilterPrice.module.css';

const ActivityFilterPrice = ({ onPriceChange }) => {
  const plainOptions = [
    { label: '$200', value: '0-200' },
    { label: '$200-$400', value: '200-400' },
    { label: '$400-$600', value: '400-600' },
    { label: '$600-$800', value: '600-800' },
    { label: '$800-$1000', value: '800-1000' },
    { label: '$1000以上', value: '1000-' },
  ];

  const [value1, setValue1] = useState('');

  const onChange1 = (e) => {
    const selectedValue = e.target.value;
    console.log('radio1 checked', selectedValue);
    setValue1(selectedValue);

    const [minPrice, maxPrice] = selectedValue.split('-').map((price) => {
      if (price === '') return null;
      return parseInt(price);
    });

    // Call the callback function with minPrice and maxPrice values
    onPriceChange(minPrice, maxPrice);
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
        <label className={styles.labels}>活動價格：</label>
        <Radio.Group
          options={plainOptions}
          onChange={onChange1}
          value={value1}
        />
      </div>
    </ConfigProvider>
  );
};

export default ActivityFilterPrice;
