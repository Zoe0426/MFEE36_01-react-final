import styles from './shop-product-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import RateStarPill from '../rateStar/RateStarPill';
import { Col } from 'antd';
import Link from 'next/link';

export default function ShopProductCard({
  product_sid = '',
  name = '',
  img = '',
  max_price = 0,
  min_price = 0,
  avg_rating = 0,
  col = 1,
  xs = 12,
}) {
  return (
    // <Col xs={xs} sm={xs} md={col} className={styles.card}>
      <Link
        className={styles.normal_card}
        href={`http://localhost:3000/product/${product_sid}`}
      >
        <div className={styles.card_head}>
          <div>
            <img src={`/product-img/${img}`} alt={name} />
          </div>
          <FontAwesomeIcon icon={faHeart} className={styles.heart_icon} />
        </div>
        <div className={styles.card_body}>
          <p className={styles.card_title}>{name}</p>
          <div className={styles.card_info}>
            <div className={styles.icons}>
              {avg_rating && <RateStarPill score={avg_rating} />}
            </div>
            <div>
              {max_price === min_price
                ? `$ ${max_price.toLocaleString('en-US')}`
                : `$ ${min_price.toLocaleString(
                    'en-US'
                  )} ~ ${max_price.toLocaleString('en-US')}`}
            </div>
          </div>
        </div>
      </Link>
    // </Col>
  );
}
