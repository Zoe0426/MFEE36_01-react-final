import styles from './shop-supplier-card.module.css';
import shed from '@/assets/shed.svg';
import { Col } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function ShopSupplierCard({
  supplier_sid = '',
  name = '',
  img = '',
  col = '1 1 256px',
}) {
  const router = useRouter();
  return (
    <>
      <Col
        flex={col}
        xs={12}
        className={styles.card}
        onClick={() => {
          const ups = new URLSearchParams({ brand: name });
          router.push(`http://localhost:3000/product/list?${ups.toString()}`);
        }}
      >
        <div className={styles.normal_card}>
          <div className={styles.shed_box}>
            <Image src={shed} className={styles.shed} />
          </div>

          {/* <div className={styles.card_img}> */}
          <img
            src={`/product-img/${img}`}
            alt={img}
            className={styles.brand_img}
          />
          {/* </div> */}

          <h6 className={styles.card_title}>{name}</h6>
        </div>
      </Col>
    </>
  );
}
