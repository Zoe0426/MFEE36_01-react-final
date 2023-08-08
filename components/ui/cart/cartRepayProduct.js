import style from './cartRepayProduct.module.css';

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
      </div>
      <div className={style.forRwd}>
        <div className={style.prodname}>
          <p className={style.prodtitle}>{prodtitle}</p>
          <p className={style.prodSubtitle}>{prodSubtitle}</p>
        </div>
        <div className={style.priceQty}>
          <div className={style.numberstyle}>
            <p className={style.price}>${price.toLocaleString()} x</p>
            <p>{qty}</p>
          </div>
          <p className={style.subtotal}>${(price * qty).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
