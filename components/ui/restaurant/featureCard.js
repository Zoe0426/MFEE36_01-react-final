import React from 'react';
import Styles from './featureCard.module.css';

export default function FeatureCard({
  img = '',
  title = '',
  feature_info = '',
}) {
  return (
    <>
      <div className="container-inner">
        <div className={Styles.feature_card}>
          <div className={Styles.feature_decorate}>
            <img src={img} alt="" />
          </div>
          <div className={Styles.feature_info}>
            <h2 className={Styles.jill_h2}>{title}</h2>
            <p className={Styles.information}>{feature_info}</p>
          </div>
        </div>
      </div>
    </>
  );
}
