// import React, {useState} from 'react'
// import Style from './blogBoardNav.module.css'
// import SubBtnBoard from '../buttons/subBtnBoard'
// import PostAuthorBTN from '../postAuthorBtn/postAuthorBtn'
// import BlogDecoration from '../blogBanner/blogDecoration'

// export default function BlogBoardNav({doctor,home,site,restaurant,salon,school,hang,young,old,product,diary}) {
//   const [selectedBoardSid, setSelectedBoardSid] = useState(-1); // 初始化 selectedBoardSid
//   return (
//     <div className={Style.boardNavbar}>
//       <div className={Style.boardNav}>
//       <div className={Style.nav}>

//         <div className={Style.boardRange}>
//             <div className={Style.board} onClick={() => doctor(1)}> {/* 傳遞索引 1 */}
//               <SubBtnBoard img="/forum_img/board_img/寵物醫療版.png" text="醫療板" selectedBoardSid={selectedBoardSid} />
//             </div>
//             <div className={Style.board} onClick={() => home(2)}>
//               <SubBtnBoard img = '/forum_img/board_img/住宿版.png' text ='住宿板' selectedBoardSid={selectedBoardSid} />
//             </div>
//             <div className={Style.board} onClick={() => site(3)}>
//               <SubBtnBoard img = '/forum_img/board_img/景點版.png' text ='景點板' selectedBoardSid={selectedBoardSid}/>
//             </div>
//             <div className={Style.board} onClick={() => restaurant(8)}>
//               <SubBtnBoard img = '/forum_img/board_img/餐廳版.png' text ='餐廳板' selectedBoardSid={selectedBoardSid}/>
//             </div>
//             <div className={Style.board} onClick={() => salon(4)}>
//               <SubBtnBoard img = '/forum_img/board_img/美容版.png' text ='美容板' selectedBoardSid={selectedBoardSid}/>
//             </div>
//             <div className={Style.board} onClick={() => school(7)}>
//               <SubBtnBoard img = '/forum_img/board_img/學校版.png' text ='學校板' selectedBoardSid={selectedBoardSid}/>
//             </div>
//             <div className={Style.board} onClick={() => hang(5)}>
//               <SubBtnBoard img = '/forum_img/board_img/狗貓聚.png' text ='狗貓聚板' selectedBoardSid={selectedBoardSid}/>
//             </div>
//             <div className={Style.board} onClick={() => young(11)}>
//               <SubBtnBoard img = '/forum_img/board_img/幼犬貓板.png' text ='幼犬貓板' selectedBoardSid={selectedBoardSid}/>
//             </div>
//             <div className={Style.board} onClick={() => old(12)}>
//               <SubBtnBoard img = '/forum_img/board_img/老狗貓版.png' text ='老犬貓板' selectedBoardSid={selectedBoardSid}/>
//             </div>
//             <div className={Style.board} onClick={() => product(9)}>
//               <SubBtnBoard img = '/forum_img/board_img/好物分享版.png' text ='好物板' selectedBoardSid={selectedBoardSid}/>
//             </div>
//             <div className={Style.board} onClick={() => diary(6)}>
//               <SubBtnBoard img = '/forum_img/board_img/毛孩日記版.png' text ='毛孩日記板' selectedBoardSid={selectedBoardSid}/>
//             </div>
//           </div>
//       </div>
//         </div>
//     </div>
//   )
// }
import React, { useState } from 'react';
import Style from './blogBoardNav.module.css';
import SubBtnBoard from '../buttons/subBtnBoard';
import PostAuthorBTN from '../postAuthorBtn/postAuthorBtn';
import BlogDecoration from '../blogBanner/blogDecoration';

export default function BlogBoardNav({
  doctor, home, site, restaurant, salon, school,
  hang, young, old, product, diary
}) {
  const [selectedBoardSid, setSelectedBoardSid] = useState(-1);

  const handleBoardClick = (boardSid) => {
    setSelectedBoardSid(boardSid);
  };

  return (
    <div className={Style.boardNavbar}>
      <div className={Style.boardNav}>
        <div className={Style.nav}>
          <div className={Style.boardRange}>
            <div className={Style.board} onClick={() => { doctor(1); handleBoardClick(1); }}>
              <SubBtnBoard img="/forum_img/board_img/寵物醫療版.png" text="醫療板" selectedBoardSid={selectedBoardSid} />
            </div>
            <div className={Style.board} onClick={() => { home(2); handleBoardClick(2); }}>
              <SubBtnBoard img="/forum_img/board_img/住宿版.png" text="住宿板" selectedBoardSid={selectedBoardSid} />
            </div>
            <div className={Style.board} onClick={() => { site(3); handleBoardClick(3); }}>
              <SubBtnBoard img="/forum_img/board_img/景點版.png" text="景點板" selectedBoardSid={selectedBoardSid} />
            </div>
            <div className={Style.board} onClick={() => { restaurant(8); handleBoardClick(8); }}>
              <SubBtnBoard img="/forum_img/board_img/餐廳版.png" text="餐廳板" selectedBoardSid={selectedBoardSid} />
            </div>
            <div className={Style.board} onClick={() => { salon(4); handleBoardClick(4); }}>
              <SubBtnBoard img="/forum_img/board_img/美容版.png" text="美容板" selectedBoardSid={selectedBoardSid} />
            </div>
            <div className={Style.board} onClick={() => { school(7); handleBoardClick(7); }}>
              <SubBtnBoard img="/forum_img/board_img/學校版.png" text="學校板" selectedBoardSid={selectedBoardSid} />
            </div>
            <div className={Style.board} onClick={() => { hang(5); handleBoardClick(5); }}>
              <SubBtnBoard img="/forum_img/board_img/狗貓聚.png" text="狗貓聚板" selectedBoardSid={selectedBoardSid} />
            </div>
            <div className={Style.board} onClick={() => { young(11); handleBoardClick(11); }}>
              <SubBtnBoard img="/forum_img/board_img/幼犬貓板.png" text="幼犬貓板" selectedBoardSid={selectedBoardSid} />
            </div>
            <div className={Style.board} onClick={() => { old(12); handleBoardClick(12); }}>
              <SubBtnBoard img="/forum_img/board_img/老狗貓版.png" text="老犬貓板" selectedBoardSid={selectedBoardSid} />
            </div>
            <div className={Style.board} onClick={() => { product(9); handleBoardClick(9); }}>
              <SubBtnBoard img="/forum_img/board_img/好物分享版.png" text="好物板" selectedBoardSid={selectedBoardSid} />
            </div>
            <div className={Style.board} onClick={() => { diary(6); handleBoardClick(6); }}>
              <SubBtnBoard img="/forum_img/board_img/毛孩日記版.png" text="毛孩日記板" selectedBoardSid={selectedBoardSid} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

