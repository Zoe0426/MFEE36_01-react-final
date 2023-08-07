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
      {/* <Dropdown
                        overlay={
                          <Menu onClick={handleCityClick}>
                            {Object.keys(cities).map((city) => (
                              <Menu.Item key={city}>{city}</Menu.Item>
                            ))}
                          </Menu>
                        }
                        className={Styles.city}
                        trigger={['click']}
                        placement="bottom"
                        autoAdjustOverflow="true"
                        overlayStyle={{
                          maxHeight: '280px',
                          overflow: 'auto',
                        }}
                      >
                        <Button>
                          <Space>
                            <p className={Styles.dropdown_arrow}>
                              {selectedCity ? selectedCity : '城市'}
                            </p>

                            <DownOutlined />
                          </Space>
                        </Button>
                      </Dropdown>

                      <Dropdown
                        overlay={
                          <Menu onClick={handleAreaClick}>
                            {selectedCity &&
                              cities[selectedCity].map((area) => (
                                <Menu.Item key={area}>{area}</Menu.Item>
                              ))}
                          </Menu>
                        }
                        className={Styles.section}
                        placement="bottomLeft"
                        overlayStyle={{ maxHeight: '280px', overflow: 'auto' }}
                        trigger={['click']}
                      >
                        <Button>
                          <Space>
                            <p className={Styles.dropdown_arrow}>
                              {selectedArea ? selectedArea : '地區'}
                            </p>
                            <DownOutlined />
                          </Space>
                        </Button>
                      </Dropdown> */}
    </ConfigProvider>
  );
};
export default App;
