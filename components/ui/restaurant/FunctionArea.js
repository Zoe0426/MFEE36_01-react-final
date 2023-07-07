import React from 'react';
import IconBtn from '../buttons/IconBtn';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Styles from './FunctionArea.module.css';

export default function FunctionArea() {
  return (
    <>
      <div className={Styles.bgc}>
        <div className="container-inner">
          <div className={Styles.function_group}>
            <IconBtn icon={faMap} text="餐廳地圖" />
            <IconBtn icon={faHeart} text="收藏列表" />
            <IconBtn icon={faFilter} text="進階篩選" />
          </div>
        </div>
      </div>
    </>
  );
}
