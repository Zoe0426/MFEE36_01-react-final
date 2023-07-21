import styles from './shop-product-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import RateStarPill from '../rateStar/RateStarPill';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ShopProductCard({
  product_sid = '',
  name = '',
  img = '',
  max_price = 0,
  min_price = 0,
  avg_rating = 0,
  tag_display = false,
  sales_qty = 0,
  like = false,
  clickHandler = () => {},
}) {
  const router = useRouter();
  return (
    <>
      <FontAwesomeIcon
        icon={faHeart}
        className={`${styles.heart_icon} ${like && styles.active}`}
        onClick={clickHandler}
      />
      <Link
        className={styles.normal_card}
        href={`http://localhost:3000/product/${product_sid}`}
      >
        <div className={styles.card_head}>
          {tag_display && !!sales_qty && (
            <div className={styles.card_tag}>
              <p>已銷售 </p>
              <p>{sales_qty}</p>
              <p> 組</p>
            </div>
          )}
          <div>
            <img src={`/product-img/${img}`} alt={name} />
          </div>
          {/* <FontAwesomeIcon icon={faHeart} className={styles.heart_icon} /> */}
        </div>
        <div className={styles.card_body}>
          <p className={styles.card_title}>{name}</p>
          <div className={styles.card_info}>
            <div className={styles.icons}>
              {avg_rating && <RateStarPill score={avg_rating} />}
            </div>
            <div>
              <span>{`$ ${min_price.toLocaleString('en-US')} `}</span>
              <span className={styles.upto}>起</span>
              {/* {max_price === min_price
              ? `$ ${max_price.toLocaleString('en-US')}`
              : `$ ${min_price.toLocaleString(
                  'en-US'
                )} ~ ${max_price.toLocaleString('en-US')}`} */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
