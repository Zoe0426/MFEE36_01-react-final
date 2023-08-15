import { AutoComplete, Input } from 'antd';
import { sevenData } from '@/data/cart/sevenEleven';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faStore,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import style from './searchSeven.module.css';
import React, { useState } from 'react';

export default function SearchSeven({
  form,
  sevenAddress = '',
  setSevenAddress = () => {},
}) {
  //console.log(sevenData);
  const [options, setOptions] = useState([]);
  //const [sevenAddress, SetSvenAddress] = useState('');
  const [showInfoCard, setShowInfoCard] = useState(false);
  const handleSearch = (searchText) => {
    const filteredOptions = sevenData
      .filter((item) => item.address.includes(searchText))
      .map((item) => ({ value: item.address }));

    setOptions(filteredOptions);
  };
  const handleBlur = (event) => {
    const sevenAddress = event.target.value;
    //console.log({ sevenAddress });
    const isValueInOptions = options.some((v) => {
      return v.value === sevenAddress;
    });
    //console.log({ isValueInOptions });
    if (!isValueInOptions) {
      setSevenAddress('');
    }
  };
  const onChange = (value) => {
    setSevenAddress(value);
    const isValueInOptions = options.some((v) => {
      return v.value === value;
    });
    isValueInOptions ? setShowInfoCard(true) : setShowInfoCard(false);
  };
  const handleSelect = (value) => {
    //setSevenAddress(value);
    form.setFieldsValue({ sevenAddress: value });
    form.validateFields(['請選擇門市']);
  };
  //預計到貨日期
  function formatDateRange(startDate, endDate) {
    const options = { month: 'numeric', day: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('zh-TW', options);

    const formattedStartDate = dateFormatter.format(startDate);
    const formattedEndDate = dateFormatter.format(endDate);

    return `${formattedStartDate} - ${formattedEndDate}`;
  }
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 2);

  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 5);

  const dateRange = formatDateRange(threeDaysLater, tenDaysLater);
  //console.log(dateRange); // 6月8日 - 6月16日
  return (
    <>
      <AutoComplete
        value={sevenAddress}
        options={options}
        onSelect={handleSelect}
        onSearch={handleSearch}
        onChange={onChange}
      >
        <Input.Search
          placeholder="您可輸入店名 / 地區 / 路名，來搜尋門市"
          onBlur={handleBlur}
        />
      </AutoComplete>
      {showInfoCard && (
        <div className={style.showInfo}>
          <p>
            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faStore}
                style={{
                  maxWidth: '20px',
                  maxHeight: '20px',
                }}
              />
            </span>

            <span className={style.shopName}>{sevenAddress.split('_')[1]}</span>
          </p>
          <p>
            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{
                  maxWidth: '20px',
                  maxHeight: '20px',
                }}
              />
            </span>
            <span>{sevenAddress.split('_')[0]}</span>
          </p>
          <p>
            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{
                  maxWidth: '20px',
                  maxHeight: '20px',
                }}
              />
            </span>
            <span className={style.date}>預計到貨：{dateRange} </span>
          </p>
        </div>
      )}
    </>
  );
}
