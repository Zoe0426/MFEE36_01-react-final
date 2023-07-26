import React from 'react';
import style from './homeResCard.module.css';
import HashTag from '../hashtag/hashtag';
export default function HomeResCard({
  stickerText = '',
  src = '',
  resName = '',
  cityArea = '',
  resDetail = '',
  reshash = [],
}) {
  return (
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
            return <HashTag key={i} text={h} marginB="mb8" />;
          })}
      </div>
    </div>
  );
}
