import Image from 'next/image';
import styles from './bg-custom-wave-decoration.module.css';

export default function BGCustomWaveDecoration({
  upperwave = '' /* 上面wave想要的顏色,不填沒關係，會呈現透明色，而顯示主背景色*/,
  downwave = '#F7ECE3' /* 下面wave想要的顏色，不可填none */,
  leftPic = '' /*請在用元件前，在該檔的上面將圖檔引入，，例如import flags from '@/assets/two-flags.svg';*/,
  rightPic = '' /*同上，圖案呈現在右邊*/,
}) {
  return (
    <div className={styles.head_decoration}>
      <div style={{ backgroundColor: upperwave }}>
        <svg
          width="1920"
          height="107"
          viewBox="0 0 1920 107"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1920 107V7.62939e-06C1854.82 41.4769 1596.74 107.027 1085.83 37.4123C634.975 -24.0186 250.362 38.5087 63.734 68.849C38.8718 72.8909 17.5233 76.3615 0 78.8918V107H1920Z"
            fill={downwave}
          />
        </svg>
      </div>
      {leftPic ? (
        <Image src={leftPic} alt={leftPic} />
      ) : (
        <div style={{ display: 'none' }}></div>
      )}
      {rightPic && <Image src={rightPic} alt={rightPic} />}
    </div>
  );
}
