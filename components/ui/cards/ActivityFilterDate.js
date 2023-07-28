import React, { useState, useEffect } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import moment from 'moment';

const ActivityFilterDate = ({ onDateChange }) => {
  const rangeConfig = {
    rules: [
      {
        type: 'array',
      },
    ],
  };

  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    // Call the parent component's callback with the selected dates
    onDateChange(selectedDates);
  }, [selectedDates, onDateChange]);

  // Handle date range change
  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  return (
    <div className="container-inner">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FD8C46',
            fontSize: 18,
            controlInteractiveSize: 18,
          },
        }}
      >
        <label>活動日期：</label>
        <DatePicker.RangePicker
          name="range-picker"
          label="活動日期"
          {...rangeConfig}
          onChange={handleDateChange}
          value={selectedDates}
        />
      </ConfigProvider>
    </div>
  );
};

export default ActivityFilterDate;
