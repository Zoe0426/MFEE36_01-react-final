import React from 'react';
import Styles from './SearchBar.module.css';
import MainBtn from './MainBtn';

export default function SearchBar({ placeholder = '', btn_text = '' }) {
  return (
    <>
      <div className={Styles.input_area}>
        <input
          type="text"
          className={Styles.search_input}
          placeholder={placeholder}
        />
        <MainBtn text={btn_text} />
      </div>
    </>
  );
}
