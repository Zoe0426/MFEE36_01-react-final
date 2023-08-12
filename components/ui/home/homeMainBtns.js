import React from 'react';
import style from './homeMainBtns.module.css';
import { useRouter } from 'next/router';
export default function HomeMainBtns() {
  const router = useRouter();
  const redirectTo = (where) => {
    router.push(`/${where}`);
  };
  return (
    <div className={style.box}>
      <div className={style.shopbg}></div>
      <img
        src="/home-images/mainBtnArea/demo.png"
        alt="demo"
        className={style.demo}
      />
      <img
        src="/home-images/h-walkingCat.png"
        alt="demo"
        className={style.cat}
      />
      <img
        src="/home-images/mainBtnArea/h-road.svg"
        alt="demo"
        className={style.road}
      />
      <img
        src="/home-images/mainBtnArea/road1.svg"
        alt="demo"
        className={style.road1}
      />
      <img
        src="/home-images/mainBtnArea/road2.svg"
        alt="demo"
        className={style.road2}
      />
      <img
        src="/home-images/mainBtnArea/road3.svg"
        alt="demo"
        className={style.road3}
      />
      <img
        src="/home-images/mainBtnArea/road4.svg"
        alt="demo"
        className={style.road4}
      />

      <img
        src="/home-images/mainBtnArea/h-shopbtn.svg"
        alt="demo"
        className={style.shopBtn}
        onClick={(e) => {
          e.preventDefault();
          redirectTo('product');
        }}
      />
      <img
        src="/home-images/mainBtnArea/h-actbtn.svg"
        alt="demo"
        className={style.actBtn}
        onClick={(e) => {
          e.preventDefault();
          redirectTo('activity');
        }}
      />
      <img
        src="/home-images/mainBtnArea/h-resbtn.svg"
        alt="demo"
        className={style.resBtn}
        onClick={(e) => {
          e.preventDefault();
          redirectTo('restaurant');
        }}
      />
      <img
        src="/home-images/mainBtnArea/h-forumbtn.svg"
        alt="demo"
        className={style.forumBtn}
        onClick={(e) => {
          e.preventDefault();
          redirectTo('forum');
        }}
      />
      <img
        src="/home-images/trafficLight.png"
        alt="demo"
        className={style.light1}
      />
      <img
        src="/home-images/trafficLight.png"
        alt="demo"
        className={style.light2}
      />
      <img
        src="/home-images/trafficLight.png"
        alt="demo"
        className={style.light3}
      />
      <img
        src="/home-images/mainBtnArea/h-trees1.png"
        alt="demo"
        className={style.trees1}
      />
      <img
        src="/home-images/mainBtnArea/h-tree.png"
        alt="demo"
        className={style.tree}
      />
      <img
        src="/home-images/mainBtnArea/h-dbTree.png"
        alt="demo"
        className={style.dbtree}
      />
      <img
        src="/home-images/mainBtnArea/h-dbTree.png"
        alt="demo"
        className={style.dbtree2}
      />
      <img
        src="/home-images/running-dog.svg"
        alt="demo"
        className={style.dog}
      />
    </div>
  );
}
