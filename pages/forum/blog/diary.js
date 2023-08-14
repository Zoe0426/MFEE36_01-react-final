import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Style from './diary.module.css';
import BlogBanner from '@/components/ui/blogBanner/blogBanner';
import { Col, Row, Pagination } from 'antd';
import BlogSidebar from '@/components/ui/blogSidebar/blogSidebar';
import BlogNav from '@/components/ui/blogNav/blogNav';
import PostCardBlog from '@/components/ui/PostCard/postCardmyPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PostDiary from '@/components/ui/postPhotoCard/postDiary';

export default function BlogIndex() {
  const [move, setMove] = useState(0);
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(0);
  const [four, setFour] = useState(0);
  const [five, setFive] = useState(0);
  const [six, setSix] = useState(0);

  const right1 = () => {
    setMove(1);
  };
  const left1 = () => {
    setMove(0);
  };
  const right2 = () => {
    setTwo(1);
  };
  const left2 = () => {
    setTwo(0);
  };
  const right3 = () => {
    setThree(1);
  };
  const left3 = () => {
    setThree(0);
  };
  const right4 = () => {
    setFour(1);
  };
  const left4 = () => {
    setFour(0);
  };
  const right5 = () => {
    setFive(1);
  };
  const left5 = () => {
    setFive(0);
  };
  const right6 = () => {
    setSix(1);
  };
  const left6 = () => {
    setSix(0);
  };

  return (
    <>
      <Head>
        <title>狗with咪 | 毛孩日記</title>
      </Head>
      <div className="container-outer">
        <div className={Style.body}>
          <BlogBanner
          // changeHandler={getSearchbarValue}
          // clickHandler={searchKeyword}
          // keyDownHandler={keyEnter}
          // inputText={keyword}
          />
          <Row className={Style.antRow}>
            <Col span={6}>
              <BlogSidebar
                profile={'/forum_img/9509de8d-407e-47c0-a500-b1cf4a27c919.jpg'}
                memberName={'潘彥廷'}
              />
            </Col>
            <Col span={16}>
              <div className={Style.blogContent}>
                <div className={Style.postNav}>
                  <div className={Style.petImg}>
                    <img
                      className={Style.profile}
                      src={'/forum_img/profile.png'}
                    />
                  </div>
                  <div className={Style.postNavText}>
                    <p className={Style.haru}>
                      哈嚕{' '}
                      <img className={Style.shiba} src="/forum_img/shiba.png" />
                    </p>
                    <p className={Style.birth}>生日：2022/04/12</p>
                  </div>
                </div>
                <div className={Style.diaryBody}>
                  <div className={Style.card}>
                    <div className={Style.sticker}></div>
                    <div className={Style.imgBorder}>
                      <div className={Style.left}>
                        <FontAwesomeIcon icon={faChevronLeft} onClick={left1} />
                      </div>
                      <div className={Style.imgHidden}>
                        <div
                          className={Style.imgRange}
                          style={{
                            left: move === 1 ? '-200px' : '0',
                            transition: 'left 0.3s ease-in-out',
                          }}
                        >
                          <img
                            className={Style.img}
                            src={'/forum_img/毛1.png'}
                          />
                          <img
                            className={Style.img}
                            src={'/forum_img/毛1-2.jpg'}
                          />
                        </div>
                      </div>
                      <div className={Style.right}>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          onClick={right1}
                        />
                      </div>
                    </div>
                    <Link href="http://localhost:3000/forum/221">
                      <div className={Style.diaryDate}>2022.06.18</div>
                      <div className={Style.diaryTitle}>
                        {'兩個月大的小哈嚕'}
                      </div>
                      <div className={Style.diaryContent}>
                        {'小小的手掌🐶 大大的力量❤️'}
                      </div>
                    </Link>
                  </div>

                  <div className={Style.card}>
                    <div className={Style.sticker}></div>
                    <div className={Style.imgBorder}>
                      <div className={Style.left}>
                        <FontAwesomeIcon icon={faChevronLeft} onClick={left2} />
                      </div>
                      <div className={Style.imgHidden}>
                        <div
                          className={Style.imgRange}
                          style={{
                            left: two === 1 ? '-200px' : '0',
                            transition: 'left 0.3s ease-in-out',
                          }}
                        >
                          <img
                            className={Style.img}
                            src={'/forum_img/毛2-1.png'}
                          />
                          <img
                            className={Style.img}
                            src={'/forum_img/毛2-2.png'}
                          />
                        </div>
                      </div>
                      <div className={Style.right}>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          onClick={right2}
                        />
                      </div>
                    </div>
                    <Link href="http://localhost:3000/forum/222">
                      <div className={Style.diaryDate}>2022.07.22</div>
                      <div className={Style.diaryTitle}>{'小辛巴哈嚕'}</div>
                      <div className={Style.diaryContent}>
                        {'阿~~西班牙~麻麻裡吉娃娃~'}
                      </div>
                    </Link>
                  </div>

                  <div className={Style.card}>
                    <div className={Style.sticker}></div>
                    <div className={Style.imgBorder}>
                      <div className={Style.left}>
                        <FontAwesomeIcon icon={faChevronLeft} onClick={left3} />
                      </div>
                      <div className={Style.imgHidden}>
                        <div
                          className={Style.imgRange}
                          style={{
                            left: three === 1 ? '-200px' : '0',
                            transition: 'left 0.3s ease-in-out',
                          }}
                        >
                          <img
                            className={Style.img}
                            src={'/forum_img/毛3-1.png'}
                          />
                          <img
                            className={Style.img}
                            src={'/forum_img/毛1-3.jpg'}
                          />
                        </div>
                      </div>
                      <div className={Style.right}>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          onClick={right3}
                        />
                      </div>
                    </div>
                    <Link href="http://localhost:3000/forum/223">
                      <div className={Style.diaryDate}>2022.08.01</div>
                      <div className={Style.diaryTitle}>{'第一次出去玩'}</div>
                      <div className={Style.diaryContent}>
                        {'鄰居小朋友來找我玩，開心到直接撒了一泡尿呀😎'}
                      </div>
                    </Link>
                  </div>

                  <div className={Style.card}>
                    <div className={Style.sticker}></div>
                    <div className={Style.imgBorder}>
                      <div className={Style.left}>
                        <FontAwesomeIcon icon={faChevronLeft} onClick={left4} />
                      </div>
                      <div className={Style.imgHidden}>
                        <div
                          className={Style.imgRange}
                          style={{
                            left: four === 1 ? '-200px' : '0',
                            transition: 'left 0.3s ease-in-out',
                          }}
                        >
                          <img
                            className={Style.img}
                            src={'/forum_img/毛4-2.png'}
                          />
                          <img
                            className={Style.img}
                            src={'/forum_img/毛4-1.png'}
                          />
                        </div>
                      </div>
                      <div className={Style.right}>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          onClick={right4}
                        />
                      </div>
                    </div>
                    <Link href="http://localhost:3000/forum/224">
                      <div className={Style.diaryDate}>2022.08.12</div>
                      <div className={Style.diaryTitle}>{'四個月大的哈嚕'}</div>
                      <div className={Style.diaryContent}>
                        {'我四個月了喔~學會在尿盆尿尿跟趴下了呦！🦊'}
                      </div>
                    </Link>
                  </div>

                  <div className={Style.card}>
                    <div className={Style.sticker}></div>
                    <div className={Style.imgBorder}>
                      <div className={Style.left}>
                        <FontAwesomeIcon icon={faChevronLeft} onClick={left5} />
                      </div>
                      <div className={Style.imgHidden}>
                        <div
                          className={Style.imgRange}
                          style={{
                            left: five === 1 ? '-200px' : '0',
                            transition: 'left 0.3s ease-in-out',
                          }}
                        >
                          <img
                            className={Style.img}
                            src={'/forum_img/毛5-1.png'}
                          />
                          <img
                            className={Style.img}
                            src={'/forum_img/毛5-2.png'}
                          />
                        </div>
                      </div>
                      <div className={Style.right}>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          onClick={right5}
                        />
                      </div>
                    </div>
                    <div className={Style.diaryDate}>2022.10.22</div>
                    <div className={Style.diaryTitle}>{'陪主人踏青汪'}</div>
                    <div className={Style.diaryContent}>
                      {'我是不是很上相呀汪😎'}
                    </div>
                  </div>

                  <div className={Style.card}>
                    <div className={Style.sticker}></div>
                    <div className={Style.imgBorder}>
                      <div className={Style.left}>
                        <FontAwesomeIcon icon={faChevronLeft} onClick={left6} />
                      </div>
                      <div className={Style.imgHidden}>
                        <div
                          className={Style.imgRange}
                          style={{
                            left: six === 1 ? '-200px' : '0',
                            transition: 'left 0.3s ease-in-out',
                          }}
                        >
                          <img
                            className={Style.img}
                            src={'/forum_img/毛6-1.png'}
                          />
                          <img
                            className={Style.img}
                            src={'/forum_img/毛6-2.png'}
                          />
                        </div>
                      </div>
                      <div className={Style.right}>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          onClick={right6}
                        />
                      </div>
                    </div>
                    <div className={Style.diaryDate}>2023.03.01</div>
                    <div className={Style.diaryTitle}>{'櫻花開了汪'}</div>
                    <div className={Style.diaryContent}>
                      {'家附近公園櫻花開了汪～來當網美狗狗了汪🦊'}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
