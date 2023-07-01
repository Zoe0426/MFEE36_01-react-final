import React from 'react'
import Styles from './SearchBar.module.css'
import MainBtn from './MainBtn'

export default function SearchBar() {
  return (
    <>
      <div className={Styles.input_area}>
        <input type="text" className={Styles.search_input} />
        <MainBtn text="找我吧" />
      </div>
    </>
  )
}
