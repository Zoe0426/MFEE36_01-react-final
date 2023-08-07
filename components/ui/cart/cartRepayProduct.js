import style from './cartRepayProduct.module.css';
import NumberInput from '../numberInput/numberInput';

export default function CartRepayProduct({
  img = '',
  prodtitle = '',
  prodSubtitle = '',
  price = 0,
  qty = 0,
}) {
  return (
    <div className={style.productCard}>
      <div>
        <img
          src={`/product-img/${img}`}
          alt="productimg"
          className={style.prodimg}
        />
        <p className={style.mobileprice}>${price}</p>
      </div>

      <div className={style.forRwd}>
        <div className={style.prodname}>
          <p className={style.prodtitle}>{prodtitle}</p>
          <p className={style.prodSubtitle}>{prodSubtitle}</p>
        </div>
        <div className={style.priceQty}>
          <p className={style.price}>${price}</p>
          <div className={style.qtyNsubTotal}>
            <div className={style.numberstyle}>{qty}</div>
            <p className={style.subtotal}>${price * qty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
