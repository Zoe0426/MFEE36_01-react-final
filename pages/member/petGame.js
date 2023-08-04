import React, { useState, useEffect, useRef } from 'react';

const ANIMATION_DURATION = 1000;
const OFFSET_X = 300;
const OFFSET_Y = 200;

export default function PetGame() {
  const [direction, setDirection] = useState('right');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const background = useRef(null);
  const startAnimationTime = useRef(null);
  const [isResting, setIsResting] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let restTimeout = null;
    if (!isAnimating && !isResting && background.current) {
      const rect = background.current.getBoundingClientRect();
      const offwidth = rect.width * 0.3;

      const minX = rect.left + offwidth;
      const maxX = rect.right - offwidth;
      const minY = rect.top + OFFSET_X;
      const maxY = rect.bottom - OFFSET_Y;

      const targetX = Math.random() * (maxX - minX) + minX;
      const targetY = Math.random() * (maxY - minY) + minY;

      setTargetPosition((prevPos) => ({ ...prevPos, x: targetX, y: targetY }));

      setIsAnimating(true);

      const animate = (animationTime) => {
        setIsMoving(true);
        if (!startAnimationTime.current) {
          startAnimationTime.current = animationTime;
        }

        const timeElapsed = animationTime - startAnimationTime.current;
        const progress = Math.min(timeElapsed / ANIMATION_DURATION, 1);

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
          setIsMoving(false);
          setIsResting(true);
          restTimeout = setTimeout(
            () => setIsResting(false),
            Math.random() * 2000 + 1000
          );
        }
      };

      requestAnimationFrame(animate);
    }

    return () => clearTimeout(restTimeout);
  }, [isAnimating, isResting]);

  return (
    <div className="background" ref={background}>
      <Cat position={position} direction={direction} isMoving={isMoving} />{' '}
      {/* Changes here */}
    </div>
  );
}

const Cat = ({ position, direction, isMoving }) => {
  const petStyle = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    // 如果direction是left，則將scaleX設置為-1
    transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
  };
  const imageSource = isMoving
    ? '/pet_game/cat_move.png'
    : '/pet_game/cat_idle.png'; // Changes here

  return <img src={imageSource} style={petStyle} alt="pet" />;
};
