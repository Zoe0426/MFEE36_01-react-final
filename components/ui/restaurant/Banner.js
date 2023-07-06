import React from 'react';
import SearchBar from '../buttons/SearchBar';
import Styles from './Banner.module.css';

export default function Banner() {
  return (
    <>
      <div className={Styles.banner}>
        <div className={Styles.search}>
          <h1 className={Styles.jill_h1}>想知道哪裡有寵物餐廳？</h1>
          <SearchBar placeholder="搜尋餐廳名稱" btn_text="尋找餐廳" />
        </div>
      </div>
    </>
  );
}
