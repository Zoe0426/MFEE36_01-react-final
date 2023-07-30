import { useState, useEffect, useRef } from 'react';

export default function PetGame() {
  const background = useRef(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    let targetX;
    let targetY;
    if (background.current) {
      let rect = background.current.getBoundingClientRect();
      let divDimensions = background.current.getBoundingClientRect();

      let offwidth = divDimensions.width * 0.3;

      let minX = rect.left + offwidth;
      let maxX = rect.right - offwidth;
      let minY = rect.top + 300;
      let maxY = rect.bottom - 200;

      targetX = Math.random() * (maxX - minX) + minX;
      targetY = Math.random() * (maxY - minY) + minY;

      console.log('targetX', targetX);
    }

    const updatePosition = () => {
      setPosition({
        left: targetX,
        top: targetY,
      });
    };

    const timerId = setInterval(updatePosition, 1000); // 每秒更新一次位置

    // 当组件被卸载时清除定时器
    return () => clearInterval(timerId);
  }, [position]);

  // return <div ref={background}>This is a sample div.</div>;

  return (
    <>
      <div className="background" ref={background}>
        img
        <img
          src="/pet_game/cat_idle.png"
          alt=""
          className="pet"
          style={{
            position: 'absolute',
            left: position.left,
            top: position.top,
          }}
        />
      </div>
    </>
  );
}
