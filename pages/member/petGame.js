import React, { useState, useEffect, useRef } from 'react';
const OFFSET_X = 300;
const OFFSET_Y = 200;

export default function PetGame() {
  const lastImageSwitchTime = useRef(null);
  const [moveImageIndex, setMoveImageIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const background = useRef(null);
  const startAnimationTime = useRef(null);
  const [isResting, setIsResting] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isCatVisible, setIsCatVisible] = useState(false);
  // 將 ANIMATION_DURATION 搬到 state
  const [animationDuration, setAnimationDuration] = useState(50);

  useEffect(() => {
    let restTimeout = null;
    if (!isAnimating && !isResting && background.current) {
      const rect = background.current.getBoundingClientRect();
      const offwidth = rect.width * 0.3;

      const minX = rect.left + offwidth;
      const maxX = rect.right - offwidth;
      const minY = rect.top + OFFSET_X;
      const maxY = rect.bottom - OFFSET_Y;

      let targetX;
      let targetY;
      if (moveCount === 0) {
        // 如果 moveCount 為 1，則將目標設為中心
        targetX = rect.width / 2 - 100;
        targetY = rect.height / 2;
      } else {
        // 如果不是，就隨機位置
        targetX = Math.random() * (maxX - minX) + minX;
        targetY = Math.random() * (maxY - minY) + minY;
      }

      setTargetPosition((prevPos) => ({ ...prevPos, x: targetX, y: targetY }));

      setIsAnimating(true);

      const animate = (animationTime) => {
        setIsMoving(true);
        if (!startAnimationTime.current) {
          startAnimationTime.current = animationTime;
        }

        const timeElapsed = animationTime - startAnimationTime.current;
        const progress = Math.min(timeElapsed / animationDuration, 1);

        if (
          !lastImageSwitchTime.current ||
          animationTime - lastImageSwitchTime.current > 100
        ) {
          setMoveImageIndex((prevIndex) => (prevIndex + 1) % 2);
          lastImageSwitchTime.current = animationTime;
        }

        // Calculate new position
        const newPosition = {
          x: position.x + (targetPosition.x - position.x) * progress,
          y: position.y + (targetPosition.y - position.y) * progress,
        };
        if (newPosition.x < position.x) {
          setDirection('left');
        } else {
          setDirection('right');
        }
        // Update position state
        setPosition(newPosition);

        // Continue animation if not finished
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          startAnimationTime.current = null;
          lastImageSwitchTime.current = null;
          setIsMoving(false);
          setIsResting(true);
          setMoveCount((prevCount) => prevCount + 1);
          if (moveCount === 1) {
            setIsCatVisible(true);
            setAnimationDuration(1000);
          }
          if (moveCount < 1) {
            setIsResting(false);
          } else {
            restTimeout = setTimeout(
              () => setIsResting(false),
              Math.random() * 2000 + 1000
            );
          }
        }
      };

      requestAnimationFrame(animate);
    }

    return () => clearTimeout(restTimeout);
  }, [isAnimating, isResting]);

  return (
    <div className="background" ref={background}>
      {isCatVisible && (
        <Cat
          position={position}
          direction={direction}
          isMoving={isMoving}
          moveImageIndex={moveImageIndex}
        />
      )}
    </div>
  );
}

const Cat = ({ position, direction, isMoving, moveImageIndex }) => {
  const petStyle = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    // 如果direction是left，則將scaleX設置為-1
    transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
  };
  const imageSource = isMoving
    ? `/pet_game/cat_move0${moveImageIndex + 1}.png`
    : '/pet_game/cat_idle.png';

  return <img src={imageSource} style={petStyle} alt="pet" />;
};
