import React from 'react';
import Styles from './OrderSearchBar.module.css';
import MainBtn from './MainBtn';

export default function OrderSearchBar({
  placeholder = '',
  btn_text = '',
  inputText = '',
  changeHandler = () => {},
  clickHandler = () => {},
  keyDownHandler = () => {},
}) {
  return (
    <>
      <div className={Styles.input_area}>
        <input
          type="text"
          className={Styles.search_input}
          value={inputText}
          placeholder={placeholder}
          onChange={changeHandler}
          onKeyUp={keyDownHandler}
        />
        <MainBtn text={btn_text} clickHandler={clickHandler} />
      </div>
    </>
  );
}
