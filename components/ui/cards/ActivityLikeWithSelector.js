import React from 'react';
import styles from './ActivityLikeWithSelector.module.css';
import IconSeconBtn from '@/components/ui/buttons/IconSeconBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faFilter } from '@fortawesome/free-solid-svg-icons';

const ActivityLikeWithSelector = () => {
  return (
    <div className={styles.btn_group}>
      <div className={styles.btn} >
        < IconSeconBtn icon={faHeart} text='收藏列表' />
      </div>  
      < IconSeconBtn icon={faFilter} text='進階篩選' />
    </div>
  )
}

export default ActivityLikeWithSelector
