import React from 'react';
import Styles from './modal.module.css';

export default function Modal() {
  return (
    <>
      <div className={Styles.container}>
        <form action="/action_page.php" method="post">
          <h1 className={Styles.jill_h1}>Login Information</h1>
          <input
            type="text"
            name=""
            id=""
            placeholder="Username"
            className={Styles.input_text}
          />

          <div className={Styles.box}>
            <div className="submit_back">
              <input type="submit" value="Log in" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
