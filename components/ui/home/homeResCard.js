import React from 'react';
import style from './homeResCard.module.css';
import HashTag from '../hashtag/hashtag';
export default function HomeResCard({
  showDeco = 1,
  stickerText = 0,
  src = '',
  resName = '',
  cityArea = '',
  resDetail = '',
  reshash = [],
  clickHandler = () => {},
}) {
  stickerText
    ? (stickerText = '日式庭園讓毛孩可自由跑跳')
    : (stickerText = '專屬寵物包箱與毛孩餐點');
  return (
    <div className={style.box} onClick={clickHandler}>
      {showDeco === 1 && <p className={style.decorationBox}></p>}

      <div className={style.hresCard}>
        <div className={style.stickerbox}>
          <p className={style.hresSticker}>{stickerText}</p>
        </div>

        <img src={src} alt="" className={style.hresimg} />
        <p className={style.resName}>{resName}</p>
        <p className={style.cityArea}>{cityArea}</p>
        <p className={style.resDetail}>{resDetail}</p>
        <div className={style.reshash}>
          {reshash &&
            reshash.map((h, i) => {
              return <HashTag key={i} text={`#${h}`} />;
            })}
        </div>
      </div>
    </div>
  );
}
