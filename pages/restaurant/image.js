import { useState } from 'react';
import Styles from './Image.module.css';
import { SlideImage } from './ImageSample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';

export default function Image() {
  const [modal, setModal] = useState(false);
  const [current, setCurrnet] = useState(0);
  const length = SlideImage.length;

  //控制開關
  const toggleModal = () => {
    setModal(!modal);
  };

  //下一張照片
  const nextSlide = () => {
    setCurrnet(current === length - 1 ? 0 : current + 1);
  };

  //上一張照片
  const prevtSlide = () => {
    setCurrnet(current === 0 ? length - 1 : current - 1);
  };

  console.log(current);

  if (!Array.isArray(SlideImage) || SlideImage.length <= 0) {
    return null;
  }

  return (
    <>
      <SecondaryBtn clickHandler={toggleModal} text="餐廳菜單" />
      {modal && (
        <>
          <div onClick={toggleModal} className={Styles.overlay}></div>
          <div className={Styles.slider}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={Styles.left_arrow}
              onClick={prevtSlide}
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
                  // className={
                  //   index === current ? Styles.slide.active : Styles.slide
                  // }
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
          </div>
        </>
      )}
    </>
  );
}
