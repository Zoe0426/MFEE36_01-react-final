import React, { useState, useEffect } from 'react';
import Styles from './ImageGallary.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
  faMinus,
  faSearchMinus,
  faFileLines,
} from '@fortawesome/free-solid-svg-icons';

import IconSeconBtn from '../buttons/IconSeconBtn';

export default function ImageGallary({ data = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resetPage, setResetPage] = useState(false);
  const length = data.length;
  const maxZoomLevel = 3;

  useEffect(() => {
    if (!modalOpen) {
      setCurrentPage(1);
    }
  }, [resetPage, modalOpen]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragOffsetX(0);
        setDragOffsetY(0);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const toggleModal = () => {
    // setModalOpen(!modalOpen);
    setCurrent(0);
    setZoomLevel(1);
    setIsDragging(false);
    const newModalOpen = !modalOpen;
    setModalOpen(newModalOpen);
    if (newModalOpen) {
      document.body.classList.add('likeList-open');
    } else {
      document.body.classList.remove('likeList-open');
    }
  };

  const nextSlide = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, length));
    setCurrent((current) => (current + 1) % length);
    setZoomLevel(1);
  };

  const prevSlide = () => {
    setCurrent((current) => (current - 1 + length) % length);
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    setZoomLevel(1);
  };

  const zoomReset = () => {
    setZoomLevel(1);
  };

  const zoomIn = () => {
    if (zoomLevel < maxZoomLevel) {
      setZoomLevel((prevZoom) => prevZoom + 0.2);
    }
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 1));
  };
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStartX(e.pageX);
      setDragStartY(e.pageY);
      setDragOffsetX(0); // 保持之前的偏移量
      setDragOffsetY(0);
    }
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.pageX - dragStartX;
      const deltaY = e.pageY - dragStartY;
      setDragOffsetX(deltaX);
      setDragOffsetY(deltaY);
    }
  };
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffsetX(0);
      setDragOffsetY(0);
    }
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
                style={{
                  display: current === 0 ? 'none' : 'block',
                }}
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                className={Styles.right_arrow}
                onClick={nextSlide}
                style={{ display: current === length - 1 ? 'none' : 'block' }}
              />
              {data.map((v, index) => (
                <div
                  key={index}
                  className={
                    index === current ? Styles.slide_active : Styles.slide
                  }
                >
                  {index === current && (
                    <>
                      <div
                        className={Styles.image_container}
                        onMouseDown={handleMouseDown}
                        handleMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          userSelect: 'none',
                          cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                      >
                        <img
                          src={`/rest_image/menu/${data[current].menu_name}`}
                          alt="travel"
                          className={Styles.image}
                          style={{
                            transform: `translate(${dragOffsetX}px, ${dragOffsetY}px) scale(${zoomLevel})`,
                            transition: 'transform 0.2s',
                          }}
                          draggable="false"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div className={Styles.zoom_buttons}>
                <div className={Styles.page_indicator}>
                  頁面： {currentPage} / {length}
                </div>
                <button onClick={zoomOut}>
                  <FontAwesomeIcon icon={faMinus} className={Styles.plus} />
                </button>
                <button onClick={zoomReset}>
                  <FontAwesomeIcon
                    icon={faSearchMinus}
                    className={Styles.plus}
                  />
                </button>
                <button onClick={zoomIn}>
                  <FontAwesomeIcon icon={faPlus} className={Styles.plus1} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
