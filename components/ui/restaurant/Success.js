import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { Button, message, Space } from 'antd';
import Styles from './Success.module.css';

export default function Success({ clickHandler }) {
  //tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: '網址已成功複製到剪貼板',
    });
  };
  return (
    <>
      {contextHolder}
      <Space>
        <div
          onClick={success}
          className={Styles.tooltipWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon
            icon={faClone}
            className={Styles.clone}
            onClick={clickHandler}
            style={{ maxWidth: '20px', maxHeight: '20px' }}
          />
          {showTooltip && <div className={Styles.tooltip}>複製網址</div>}
        </div>
      </Space>
    </>
  );
}
