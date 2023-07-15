import { useState } from 'react';
import Styles from './ImageGallary.module.css';
import { SlideImage } from './ImageSample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faFileLines,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import IconSeconBtn from '../buttons/IconSeconBtn';

export default function ImageGallary() {
  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const length = SlideImage.length;

  //控制開關
  const toggleModal = () => {
    setModal(!modal);
  };

  //下一張照片
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  //上一張照片
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  console.log(current);

  if (!Array.isArray(SlideImage) || SlideImage.length <= 0) {
    return null;
  }

  return (
    <>
      <IconSeconBtn
        clickHandler={toggleModal}
        text="餐廳菜單"
        icon={faFileLines}
      />
      {modal && (
        <>
          <div onClick={toggleModal} className={Styles.overlay}></div>
          <div className={Styles.slider}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={Styles.left_arrow}
              onClick={prevSlide}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              className={Styles.right_arrow}
              onClick={nextSlide}
            />
            {SlideImage.map((slide, index) => {
              return (
                <div
                  key={index}
                  className={
                    index === current ? Styles.slide_active : Styles.slide
                  }
                >
                  {index === current && (
                    <img
                      src={slide.image}
                      alt="travel"
                      className={Styles.image}
                    />
                  )}
                </div>
              );
            })}
            <FontAwesomeIcon
              icon={faXmark}
              className={Styles.xmark}
              onClick={toggleModal}
            />
          </div>
        </>
      )}
    </>
  );
}
