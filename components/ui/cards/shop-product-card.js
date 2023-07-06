import styles from './shop-product-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
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
  xs = 1,
}) {
  return (
    <Col xs={xs} sm={xs} md={col} className={styles.card}>
      <Link
        className={styles.normal_card}
        href={`http://localhost:3000/product/${product_sid}`}
      >
        <div className={styles.card_head}>
          <div>
            <img src={`/product-img/${img}`} alt="" />
          </div>
          <FontAwesomeIcon icon={faHeart} className={styles.heart_icon} />
        </div>
        <div className={styles.card_body}>
          <h6 className={styles.card_title}>{name}</h6>
          <div className={styles.card_info}>
            <div className={styles.icons}>
              <FontAwesomeIcon icon={faStar} className={styles.star_icon} />
              <span>{avg_rating && `( ${avg_rating} )`}</span>
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
    </Col>
  );
}
