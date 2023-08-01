import React from 'react';
import Styles from './Tab.module.css';
import { useState } from 'react';

export default function Tab({
  text1 = '',
  text2 = '',
  text3 = '',
  text4 = '',
  text5 = '',
  clickHandler1 = () => {},
  clickHandler2 = () => {},
  clickHandler3 = () => {},
  clickHandler4 = () => {},
  clickHandler5 = () => {},
}) {
  const [activeTab, setActiveTab] = useState(text1); // 預設選中第一個Tab

  // 切換Tab
  const handleTabClick = (text) => {
    setActiveTab(text);
  };

  return (
    <>
      <div className={Styles.tab_group}>
        <div
          className={`${Styles.tab} ${
            activeTab === text1 ? Styles.active_tab : ''
          }`}
          onClick={() => clickHandler1(text1)}
        >
          {text1}
        </div>
        <div
          className={`${Styles.tab} ${
            activeTab === text2 ? Styles.active_tab : ''
          }`}
          onClick={() => clickHandler2(text2)}
        >
          {text2}
        </div>
        <div
          className={`${Styles.tab} ${
            activeTab === text3 ? Styles.active_tab : ''
          }`}
          onClick={() => clickHandler3(text3)}
        >
          {text3}
        </div>
        <div
          className={`${Styles.tab} ${
            activeTab === text4 ? Styles.active_tab : ''
          }`}
          onClick={() => clickHandler4(text4)}
        >
          {text4}
        </div>
        <div
          className={`${Styles.tab} ${
            activeTab === text5 ? Styles.active_tab : ''
          }`}
          onClick={() => clickHandler5(text5)}
        >
          {text5}
        </div>
      </div>
    </>
  );
}
