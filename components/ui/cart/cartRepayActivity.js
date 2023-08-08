import style from './cartRepayActivity.module.css';

export default function CartRepayActivity({
  img = '',
  prodtitle = '',
  prodSubtitle = '',
  adPrice = 0,
  adQty = 0,
  kidPrice = 0,
  kidQty = 0,
}) {
  return (
    <div className={style.productCard}>
      <img
        src={`/activity_img/${img}`}
        alt="activity-Img"
        className={style.prodimg}
      />

      <div className={style.forRwd}>
        <div className={style.prodname}>
          <p className={style.prodtitle}>{prodtitle}</p>
          <p className={style.prodSubtitle}>{prodSubtitle}</p>
        </div>
        <div className={style.priceSet}>
          <div className={style.pricebox}>
            <div className={style.qtyset}>
              <p className={style.price}>大人${adPrice.toLocaleString()}</p>
              <p className={style.numberstyle}>x {adQty}</p>
            </div>
            <div className={style.qtyset}>
              <p className={style.price}>小孩${kidPrice.toLocaleString()}</p>
              <div className={style.numberstyle}>x {kidQty}</div>
            </div>
          </div>

          <p className={style.subtotal}>
            ${(adPrice * adQty + kidPrice * kidQty).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
