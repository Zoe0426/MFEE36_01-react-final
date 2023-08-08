import React from 'react';
import { Carousel } from 'antd';
import Style from './postImg.module.css'

const contentStyle = {
  margin:0,
  height: '500px',
  color: '#fff',
  lineHeight: '500px',
  textAlign: 'center',
  background: '#364d79',
};

const PostImg = (props) => {
  const { images } = props;
  console.log(images);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange} className={Style.carousel}>
      {images.map((image, index) => (
        <div key={index}>
          <img className={Style.img} src={`${process.env.API_SERVER}/img/${image}`} alt={`Image ${index + 1}`} style={contentStyle} />
        </div>
      ))}
    </Carousel>
  );
};

export default PostImg;
