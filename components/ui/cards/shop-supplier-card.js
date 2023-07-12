import styles from './shop-supplier-card.module.css';
import shed from '@/assets/shed.svg';
import { Col } from 'antd';
import Image from 'next/image';

export default function ShopSupplierCard({
  supplier_sid = '',
  name = '',
  img = '',
  col = '1 1 256px',
}) {
  return (
    <>
      <Col flex={col} xs={12} className={styles.card}>
        <div className={styles.normal_card}>
          <Image src={shed} className={styles.shed} />

          {/* <div className={styles.card_img}> */}
          <img
            src={`/product-img/${img}`}
            alt=""
            className={styles.brand_img}
          />
          {/* </div> */}

          <h6 className={styles.card_title}>{name}</h6>
        </div>
      </Col>
    </>
  );
}
