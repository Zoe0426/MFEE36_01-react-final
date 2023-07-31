import { useState, useEffect, useRef } from 'react';

export default function PetGame() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const background = useRef(null);

  useEffect(() => {
    if (!isAnimating && background.current) {
      const rect = background.current.getBoundingClientRect();
      const offwidth = rect.width * 0.3;

      const minX = rect.left + offwidth;
      const maxX = rect.right - offwidth;
      const minY = rect.top + 300;
      const maxY = rect.bottom - 200;

      setNewTargetPosition(minX, maxX, minY, maxY);

      setIsAnimating(true);
      let startAnimationTime = null;
      const animationDuration = 1000;

      const animate = (animationTime) => {
        if (!startAnimationTime) {
          startAnimationTime = animationTime;
        }

        const timeElapsed = animationTime - startAnimationTime;
        const progress = Math.min(timeElapsed / animationDuration, 1);

        // Calculate new position
        const newPosition = {
          x: position.x + (targetPosition.x - position.x) * progress,
          y: position.y + (targetPosition.y - position.y) * progress,
        };

        // Update position state
        setPosition(newPosition);

        // Continue animation if not finished
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isAnimating, targetPosition]);

  const setNewTargetPosition = (minX, maxX, minY, maxY) => {
    const targetX = Math.random() * (maxX - minX) + minX;
    const targetY = Math.random() * (maxY - minY) + minY;
    setTargetPosition({ x: targetX, y: targetY });
  };

  return (
    <div className="background" ref={background}>
      <img
        src="/pet_game/cat_idle.png"
        alt=""
        className="pet"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </div>
  );
}
