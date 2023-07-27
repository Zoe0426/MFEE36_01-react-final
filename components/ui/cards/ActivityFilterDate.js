import React from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment'; // Import Moment.js library

const ActivityFilterDate = () => {
  const rangeConfig = {
    rules: [
      {
        type: 'array',
      },
    ],
  };

  const router = useRouter();

  // Handle date range change and update query string
  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;
    const query = { ...router.query };

    // Remove existing date parameters from the query
    delete query.startDate;
    delete query.endDate;

    if (startDate) {
      query.startDate = startDate.format('YYYY-MM-DD');
    }
    if (endDate) {
      query.endDate = endDate.format('YYYY-MM-DD');
    }

    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
  };

  // Parse query string dates to Moment.js objects
  const startDate =
    router.query.startDate && moment(router.query.startDate, 'YYYY-MM-DD');
  const endDate = router.query.endDate && moment(router.query.endDate, 'YYYY-MM-DD');

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
          value={[startDate, endDate]}
        />
      </ConfigProvider>
    </div>
  );
};

export default ActivityFilterDate;
