import Styles from './RestLikeList.module.css';
import React from 'react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function RestLikeList({
  datas = [], //需要渲染的陣列資料
  removeLikeListItem = () => {}, //用來清除某一項蒐藏清單的函式
}) {
  const router = useRouter();
  return <div>RestLikeList</div>;
}
