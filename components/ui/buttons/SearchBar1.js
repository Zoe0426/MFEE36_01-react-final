import React from 'react';
import Styles from './SearchBar1.module.css';
import MainBtn from './MainBtn';

export default function SearchBar1({
  keywordDatas = [],
  showKeywordDatas = false,
  placeholder = '',
  btn_text = '',
  inputText = '',
  changeHandler = () => {},
  blurHandler = () => {},
  clickHandler = () => {},
  keyDownHandler = () => {},
  autocompleteHandler = () => {},
}) {
  return (
    <>
      <div className={Styles.input_area}>
        <div>
          <input
            type="text"
            className={Styles.search_input}
            value={inputText}
            placeholder={placeholder}
            onChange={changeHandler}
            onBlur={blurHandler}
            onKeyUp={keyDownHandler}
          />
          {showKeywordDatas && keywordDatas.length > 0 && (
            <div className={Styles.keyword_reminder}>
              <ul>
                {keywordDatas.map((v, i) => {
                  if (i < 10) {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          autocompleteHandler(v.name);
                        }}
                      >
                        {v.name}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}
        </div>

        <MainBtn text={btn_text} clickHandler={clickHandler} />
      </div>
    </>
  );
}
