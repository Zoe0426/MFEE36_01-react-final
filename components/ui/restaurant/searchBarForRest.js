import React from 'react';
import Styles from './searchBarForRest.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar2({
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
  clearHandler = () => {},
}) {
  return (
    <>
      <div className={Styles.input_area}>
        <div>
          <div className={Styles.input_box}>
            <input
              type="text"
              className={Styles.search_input}
              value={inputText}
              placeholder={placeholder}
              onChange={changeHandler}
              onBlur={blurHandler}
              onKeyUp={keyDownHandler}
            />
            <FontAwesomeIcon
              icon={faXmark}
              className={Styles.btn_clear_text}
              onClick={clearHandler}
            />
          </div>
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
