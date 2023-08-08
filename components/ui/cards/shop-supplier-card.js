import styles from './shop-supplier-card.module.css';
import shed from '@/assets/shed.svg';
import { Col } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ShopSupplierCard({
  supplier_sid = '',
  name = '',
  img = '',
  col = '1 1 256px',
}) {
  const engName = name.split('-')[0];
  const chnName = name.split('-')[1];
  const [showName, setShowName] = useState(engName);
  const router = useRouter();
  return (
    <>
      <Col
        flex={col}
        xs={12}
        className={styles.card}
        onClick={() => {
          const ups = new URLSearchParams({ brand: name });
          router.push(`${process.env.WEB}/product/list?${ups.toString()}`);
        }}
        onMouseEnter={() => {
          chnName ? setShowName(chnName) : setShowName(engName);
        }}
        onMouseLeave={() => {
          setShowName(engName);
        }}
      >
        <div className={styles.normal_card}>
          <div className={styles.shed_box}>
            <Image src={shed} className={styles.shed} alt="shed" />
          </div>
          <img
            src={`/product-img/${img}`}
            alt={img}
            className={styles.brand_img}
          />
          <h6 className={styles.card_title}>{showName}</h6>
        </div>
      </Col>
    </>
  );
}
