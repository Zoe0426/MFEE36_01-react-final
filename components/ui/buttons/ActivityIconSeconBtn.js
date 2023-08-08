import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Styles from './ActivityIconSeconBtn.module.css';


export default function ActivityIconSeconBtn({
  activity_sid,
  isInLikeList = false,
  handleLikeClick,
  icon = '',
  text = '',
  auth,
}) {
  // const [isLiked, setIsLiked] = useState(isInLikeList);
  // console.log(isInLikeList)

  // useEffect(() => {
  //   setIsLiked(isInLikeList);
  // }, [isInLikeList]);

  const handleLikeIconClick = (e) => {
    e.preventDefault();
    if (isInLikeList) {
      removeItemFromLikeList();
    } else {
      addItemToLikeList();
    }
  };

  const addItemToLikeList = async () => {
    try {
      await handleLikeClick(activity_sid, auth.token);
      // setIsLiked(true);
    } catch (error) {
      console.error('Error adding to likelist:', error);
    }
  };
  
  const removeItemFromLikeList = async () => {
    try {
      await handleLikeClick(activity_sid, auth.token);
      // setIsLiked(false); 
    } catch (error) {
      console.error('Error removing from likelist:', error);
    }
  };
  

  return (
    <button className={Styles.icon_btn} onClick={handleLikeIconClick}>
      <FontAwesomeIcon
        icon={icon}
        className={isInLikeList ? `${Styles.icon} ${Styles.icon_red}` : Styles.icon}
        style={{ maxWidth: '18px', maxHeight: '18px' }}
      />

      {text}
    </button>
  );
}
