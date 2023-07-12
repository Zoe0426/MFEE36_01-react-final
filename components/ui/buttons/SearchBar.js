import React from 'react';
import Styles from './SearchBar.module.css';
import MainBtn from './MainBtn';

export default function SearchBar({ 
  placeholder = '', 
  btn_text = '', 
  inputText='',
  changeHandler=()=>{}, 
  clickHandler=()=>{}, 
  keyDownHandler=()=>{}
  }) {
  return (
    <>
      <div className={Styles.input_area}>
        <input
          type="text"
          className={Styles.search_input}
          value={inputText}
          placeholder={placeholder} onChange={changeHandler} onKeyUp={keyDownHandler}
        />
        <MainBtn text={btn_text} clickHandler={clickHandler}/>
      </div>
    </>
  );
}
