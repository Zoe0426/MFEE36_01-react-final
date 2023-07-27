import React, { useState, } from 'react';
import { Radio, Button, DatePicker, Form, ConfigProvider } from 'antd';
const { RangePicker } = DatePicker;
import styles from './ActivityFilterPrice.module.css';
import { useRouter } from 'next/router'; 

const ActivityFiltersPrcie = () => {
  const plainOptions = [
    { label: '$200', value: '0-200' },
    { label: '$200-$400', value: '200-400' },
    { label: '$400-$600', value: '400-600' },
    { label: '$600-$800', value: '600-800' },
    { label: '$800-$1000', value: '800-1000' },
    { label: '$1000以上', value: '1000-' },
  ];
  const [value1, setValue1] = useState('');

  const router = useRouter();

  const onChange1 = (e) => {
    const selectedValue = e.target.value;
    console.log('radio1 checked', selectedValue);
    setValue1(selectedValue);

    // Extract minPrice and maxPrice from the selectedValue
    const [minPrice, maxPrice] = selectedValue.split('-').map((price) => {
      if (price === '') return ''; // If the price is an empty string, return an empty string
      return parseInt(price);
    });

    // Update the query string with the appropriate parameters
    const query = { ...router.query };
    if (minPrice !== '') {
      query.minPrice = minPrice;
    } else {
      delete query.minPrice;
    }
    if (maxPrice !== '') {
      query.maxPrice = maxPrice;
    } else {
      delete query.maxPrice;
    }

    router.push({
      pathname: router.pathname,
      query,
    });
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
      <label className={styles.labels}>活動價格：</label>
      <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
    </ConfigProvider>
  );
};

export default ActivityFiltersPrcie;


