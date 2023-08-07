import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import SecondNavbar from '@/components/layout/SecondNavbar';
import ModalWithoutBtn from '@/components/ui/modal/modal-without-btn';
import { useRouter } from 'next/router';
import Draggable from 'react-draggable';
const OFFSET_X = 206;
const OFFSET_Y = 150;
const waitTimeMin = 500;
const waitTimeMax = 3000;
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
  const [animationDuration, setAnimationDuration] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [count, setCount] = useState(0);
  const [catImage, setCatImage] = useState('/pet_game/cat_idle.png');
  const [catTransform, setCatTransform] = useState('scaleX(1)');
  let [transform, setTransform] = useState('scaleX(1)');
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const [first, setFirst] = useState(false);
  const [isOver24, setIsOver24] = useState(false);
  const [signTime, setSignTime] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  // 在拖曳開始時設定 isDragging 為 true 和 isPaused 為 true
  const onStartDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIsPaused(true);
  };

  // 在拖曳結束時設定 isDragging 為 false 和 isPaused 為 false
  const onStopDrag = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setIsPaused(false);
    setMousePosition({ x: e.clientX, y: e.clientY });
    setDragPosition({ x: 0, y: 0 });

    const finalPosition = { x: e.clientX, y: e.clientY };

    const rect = background.current.getBoundingClientRect();
    const offwidth = rect.width * 0.3;
    const minX = rect.left + offwidth;
    const maxX = rect.right - offwidth;
    const minY = rect.top + OFFSET_Y;
    const maxY = rect.bottom - OFFSET_Y;

    if (
      // finalPosition.x >= minX &&
      // finalPosition.x <= maxX &&
      finalPosition.y <= maxY &&
      finalPosition.y >= minY
    ) {
      setFoods((prevFoods) => [...prevFoods, finalPosition]);
    }

    setMousePosition({ x: e.clientX, y: e.clientY });
    setDragPosition({ x: 0, y: 0 });
  };

  // 強制刷新组件的函数
  const forceUpdate = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // 在拖曳時更新 dragPosition
  const onDrag = (e, data) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setDragPosition({ x: data.x, y: data.y });
  };

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (!auth.id && first) {
      const from = router.asPath;
      router.push(`/member/sign-in?from=${from}`);
    } else if (auth.id) {
      setPageLoading(false);
      if (auth.token) {
        fetch(`${process.env.API_SERVER}/member-api/getSignGame`, {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        })
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
            //計算上次簽到時間是否超過24小時;
            const lastTime = new Date(data[0].signin_time);
            const currentTime = new Date();
            const diffMillis = Math.abs(
              currentTime.getTime() - lastTime.getTime()
            );
            const differenceHr = diffMillis / (1000 * 60 * 60);
            // console.log('lastTime', lastTime);
            // console.log('currentTime', currentTime);
            // console.log('differenceHr', differenceHr);
            if (differenceHr > 24) {
              setIsOver24(true);
            }

            setSignTime(data.signin_time);
          });
      } else {
        console.log('User is not logged in. Cannot fetch coupons.');
      }
    }
  }, [auth, first]);

  useEffect(() => {
    if (isDragging) {
      // 如果正在拖動，則強制更新貓的組件
      forceUpdate();
    }
  }, [dragPosition]);

  useEffect(() => {
    if (isDragging && !isMoving) {
      setTransform(mousePosition.x < position.x ? 'scaleX(-1)' : 'scaleX(1)');
    } else if (isMoving) {
      setTransform(direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)');
    }
  }, [mousePosition, direction, isMoving]);

  //循環自主移動
  useEffect(() => {
    let restTimeout = null;
    if (!isAnimating && !isResting && background.current) {
      const rect = background.current.getBoundingClientRect();
      const offwidth = rect.width * 0.3;

      const minX = rect.left + offwidth;
      const maxX = rect.right - offwidth;
      const minY = rect.top + OFFSET_Y;
      const maxY = rect.bottom - OFFSET_Y;

      let closestFood = null;
      let minDistance = Infinity;
      foods.forEach((food, index) => {
        const distance = Math.sqrt(
          Math.pow(food.x - position.x, 2) + Math.pow(food.y - position.y, 2)
        );
        if (distance < minDistance) {
          closestFood = { ...food, index };
          minDistance = distance;
        }
      });

      let targetX;
      let targetY;

      if (moveCount === 0) {
        targetX = rect.width / 2 - 100;
        targetY = rect.height / 2;
      } else if (closestFood) {
        targetX = closestFood.x;
        targetY = closestFood.y;
      } else {
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

        const newPosition = {
          x: position.x + (targetPosition.x - position.x) * progress,
          y: position.y + (targetPosition.y - position.y) * progress,
        };
        if (newPosition.x < position.x) {
          setDirection('left');
        } else {
          setDirection('right');
        }
        setPosition(newPosition);

        if (progress < 1 && !isPaused) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          startAnimationTime.current = null;
          lastImageSwitchTime.current = null;
          setIsMoving(false);
          setIsResting(true);

          // Step 2: Remove the food at position.
          if (closestFood && progress >= 1) {
            setFoods((prevFoods) =>
              prevFoods.filter((_, index) => index !== closestFood.index)
            );
            if (isOver24) {
              fetch(`${process.env.API_SERVER}/member-api/createSignGame`, {
                method: 'POST',
                headers: {
                  Authorization: 'Bearer ' + auth.token,
                },
              })
                .then((r) => r.json())
                .then((data) => {
                  console.log(data);
                  setShowModal(true);
                  setTimeout(() => {
                    setShowModal(false);
                    setIsOver24(false);
                  }, 1200);
                });
            }
          }

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
              Math.random() * waitTimeMax + waitTimeMin
            );
          }
        }
      };

      requestAnimationFrame(animate);
    }

    return () => clearTimeout(restTimeout);
  }, [isAnimating, isResting, position, foods]);

  useEffect(() => {
    const rect = background.current.getBoundingClientRect();
    const offwidth = rect.width;

    const minX = rect.left + offwidth;
    const maxX = rect.right - offwidth;
    const minY = rect.top + OFFSET_Y;
    const maxY = rect.bottom - OFFSET_Y;

    let closestFood = null;
    let minDistance = Infinity;
    foods.forEach((food, index) => {
      const distance = Math.sqrt(
        Math.pow(food.x - position.x, 2) + Math.pow(food.y - position.y, 2)
      );
      if (distance < minDistance) {
        closestFood = { ...food, index };
        minDistance = distance;
      }
    });

    let targetX;
    let targetY;

    if (moveCount === 0) {
      targetX = rect.width / 2 - 100;
      targetY = rect.height / 2;
    } else if (closestFood) {
      targetX = closestFood.x - OFFSET_X * 0.5;
      targetY = closestFood.y - OFFSET_Y;
    } else {
      targetX = Math.random() * (maxX - minX) + minX;
      targetY = Math.random() * (maxY - minY) + minY;
    }

    setTargetPosition((prevPos) => ({ ...prevPos, x: targetX, y: targetY }));
  }, [isAnimating, isResting, position, foods]);

  return (
    <div className="background" ref={background}>
      {showModal && isOver24 && (
        <ModalWithoutBtn
          text="每日簽到成功～"
          text2="恭喜獲得10元優惠券！"
          img="/member-center-images/Icon/happy.svg"
          classTitle="active"
        />
      )}
      <SecondNavbar />
      {isCatVisible && (
        <Cat
          position={position}
          direction={direction}
          isMoving={isMoving}
          isDragging={isDragging}
          moveImageIndex={moveImageIndex}
          mousePosition={dragPosition}
          transform={transform}
        />
      )}
      <Draggable
        position={{ x: 0, y: 0 }}
        onStart={onStartDrag}
        onStop={onStopDrag}
        onDrag={onDrag}
      >
        <img
          src="/pet_game/Food_01.png"
          ﬁ
          style={{
            position: 'absolute',
            bottom: isDragging ? '170px' : '170px',
            right: isDragging ? '130px' : '150px',
            opacity: isDragging ? 1 : 1, // 在拖曳時，將 opacity 設為 0.5
          }}
          alt="Food"
        />
      </Draggable>
      {/* Show a semi-transparent clone while dragging */}
      {
        <img
          src="/pet_game/Food_01.png"
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            bottom: 170,
            right: 150,
            opacity: 0.5,
          }}
          alt="Dragging food"
        />
      }
      {foods.map((foodPosition, index) => (
        <img
          key={index}
          src="/pet_game/Food_01.png"
          style={{
            position: 'absolute',
            left: foodPosition.x,
            top: foodPosition.y,
            zIndex: Math.floor(foodPosition.y),
          }}
          alt="Food"
        />
      ))}
    </div>
  );
}

const Cat = ({ position, isMoving, isDragging, moveImageIndex, transform }) => {
  let imageSource;

  if (isDragging && !isMoving) {
    imageSource = '/pet_game/cat_idle_food.png';
  } else {
    imageSource = isMoving
      ? `/pet_game/cat_move0${moveImageIndex + 1}.png`
      : '/pet_game/cat_idle.png';
  }

  const petStyle = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    transform: transform,
    zIndex: Math.floor(position.y + 150),
  };

  return <img src={imageSource} style={petStyle} alt="pet" />;
};
