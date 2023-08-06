import React, { useState } from 'react';
import { Select, Space, ConfigProvider } from 'antd';
import cityDatas from '@/data/restaurnt/location.json';

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const handleProvinceChange = (value) => {
    setSelectedCity([value]);
    setSelectedArea(null);
  };
  const onSecondCityChange = (value) => {
    setSelectedArea(value);
  };
  const cities = cityDatas;
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
      <Space wrap>
        <Select
          defaultValue={cities[0]}
          placeholder="城市"
          style={{
            width: 120,
          }}
          onChange={handleProvinceChange}
          options={Object.keys(cities).map((city) => ({
            label: city,
            value: city,
          }))}
        />
        <Select
          style={{
            width: 120,
          }}
          value={selectedArea}
          placeholder="區域"
          onChange={onSecondCityChange}
          options={
            selectedCity
              ? cities[selectedCity].map((area) => ({
                  label: area,
                  value: area,
                }))
              : []
          }
          disabled={!selectedCity}
        />
      </Space>
    </ConfigProvider>
  );
};
export default App;
