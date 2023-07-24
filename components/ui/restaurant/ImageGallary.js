import { useState } from 'react';
import Styles from './ImageGallary.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faFileLines,
} from '@fortawesome/free-solid-svg-icons';

import IconSeconBtn from '../buttons/IconSeconBtn';

export default function ImageGallary({ data = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const length = data.length;

  // 控制開關
  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setCurrent(0); // 關閉 Modal 時重置 current 的值
  };

  // 切換到下一張圖片
  const nextSlide = () => {
    setCurrent((current) => (current + 1) % length);
  };

  // 切換到上一張圖片
  const prevSlide = () => {
    setCurrent((current) => (current - 1 + length) % length);
  };

  return (
    <>
      <IconSeconBtn
        clickHandler={toggleModal}
        text="餐廳菜單"
        icon={faFileLines}
      />
      {modalOpen && (
        <>
          <div className={Styles.overlay} onClick={toggleModal}></div>
          <div className={Styles.modal}>
            <div className={Styles.slider}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className={Styles.left_arrow}
                onClick={prevSlide}
                style={{ display: current === 0 ? 'none' : 'block' }} // 控制上一張箭頭顯示或隱藏
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                className={Styles.right_arrow}
                onClick={nextSlide}
                style={{ display: current === length - 1 ? 'none' : 'block' }} // 控制下一張箭頭顯示或隱藏
              />
              {data.map((v, index) => (
                <div
                  key={index}
                  className={
                    index === current ? Styles.slide_active : Styles.slide
                  }
                >
                  {index === current && (
                    <div className={Styles.image_container}>
                      <img
                        src={`/rest_image/menu/${v.menu_name}`}
                        alt="travel"
                        className={Styles.image}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
