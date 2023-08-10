import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHand,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './ActivityCard6.module.css';
import IconMainBtn from '@/components/ui/buttons/IconMainBtn';

const ActivityCard6 = ({
  member_sid = '',
  title = '',
  initialCount = 0, // 使用 initialCount 作為初始 count
  city = '',
  area = '',
  profile = null,
  content = '',
  other_message = null,
  hasVoted = false,
  setHasVoted,
  handleVote,
  setVotedMembers,
}) => {
  const [count, setCount] = useState(initialCount); // 使用 count 狀態

  const [isVoted, setIsVoted] = useState(hasVoted);

  const handleVoteClick = async () => {
    // 處理投票邏輯
    await handleVote();

    // 更新投票狀態和 count
    setHasVoted(true); // 更新 hasVoted 狀態
    setCount(count + 1);
    setIsVoted(true);

    // 更新已投票的會員陣列
    setVotedMembers((prevVotedMembers) => [...prevVotedMembers, member_sid]);
  };

  return (
    <div className={styles.card}>
      <div className={styles.right_section}>
        <div>
          {profile ? (
            <img
              className={styles.image}
              src={`${process.env.API_SERVER}/img/${profile}`}
              alt={profile}
            />
          ) : (
            <FontAwesomeIcon className={styles.image} icon={faUser} />
          )}
        </div>
        <IconMainBtn
          icon={faHand}
          text={isVoted ? '已投票' : '投我一票'}
          clickHandler={isVoted ? undefined : handleVoteClick}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.count}>{count}人已投</div>
        <div className={styles.location}>
          <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
          <div className={styles.location_text}>
            {city}
            {area}
          </div>
        </div>
        <div className={styles.description}>{content}</div>
      </div>
    </div>
  );
};

export default ActivityCard6;
