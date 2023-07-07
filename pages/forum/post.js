import React from 'react'
import Style from '@/styles/post.module.css'
import PostBanner from '@/components/ui/postBanner/postBanner'
import BoardNav from '@/components/ui/BoardNav/boardNav'
import PostArticle from '@/components/ui/postArticle/postArticle';
import PostHashtag from '@/components/ui/postHashtag/postHashtag';
import PostArticleContent from '@/components/ui/postArticleContent/postArticleContent';
import PostImg from '@/components/ui/postImg/postImg';
import PostCommentBtn from '@/components/ui/postCommentBtn/postCommentBtn';
import PostComment from '@/components/ui/postComment/postComment';
import PostCommentLaunch from '@/components/ui/postCommentLaunch/postCommentLaunch';
import PostBottom from '@/components/ui/postBottom/postBottom';

export default function Post() {
  return (
    <div className="container-outer">
        <div className={Style.body}>
            <PostBanner/>
            <BoardNav/>
            <div className={Style.postAll}>
              <div className="container-inner">
                  <PostArticle navTitle='＃分享 新北寵物友善餐廳' profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' author='莉莉安' id='@lilian' postTitle='＃分享 新北寵物友善餐廳' boardImg='/forum_img/boardrest.png' board='友善餐廳版' time='1月26日 0:53（已編輯）'/>
                  <div className={Style.hashtag}>
                    <PostHashtag text='寵物友善'/>
                    <PostHashtag text='新北市'/>                
                    <PostHashtag text='友善餐廳'/>                
                  </div>
                  <div className={Style.postImg}>
                    <PostImg img='/forum_img/chris-smith-vCPF8e_-JPg-unsplash.jpg'/>
                    <PostImg img='/forum_img/chris-smith-vCPF8e_-JPg-unsplash.jpg'/>
                    <PostImg img='/forum_img/chris-smith-vCPF8e_-JPg-unsplash.jpg'/>
                  </div>

                  <PostArticleContent postContent='歡迎來到新北，一個寵物愛護者的天堂！這裡有一個令人興奮的消息，我們為您帶來一系列寵物友善餐廳，讓您可以與您的毛孩一同享受美食之旅。
                  新北寵物友善餐廳致力於提供舒適和融洽的用餐環境，讓您的寵物成為餐桌上的特別客人。這些餐廳以寬敞的戶外座位區域、特製的寵物菜單和友善的服務精神而聞名。
                  當您踏進這些寵物友善餐廳時，您將感受到親切的氛圍和對寵物的熱愛。餐廳內的設施特別為您的寵物而設計，包括寵物用水槽、專屬的寵物區域和友善的寵物服務團隊。您的寵物會感受到與您一同用餐的喜悅，並與其他毛孩交流。
                  這些餐廳的菜單特別為您的寵物提供各種美味的選擇。無論是狗狗還是貓貓，他們都能享受到專為他們準備的健康和美味的餐點。從精緻的狗狗骨頭到口水直流的貓咪魚肉湯，這些餐廳將為您的寵物提供各種口味和選擇，滿足他們的味蕾。
                  無論是在日常用餐、慶祝特殊場合還是與朋友聚餐，新北寵物友善餐廳都能滿足您的需求。您和您的寵物可以一起享受美食、品味美酒，並在溫馨的氛圍中度過寶貴的時光。' likes='133' comments='200'/>

                  <div className={Style.commentBlock}>
                    <div className={Style.commentBTN}>
                      <PostCommentBtn text="由舊至新" bc='white'/>
                      <PostCommentBtn text="由舊至新" bc='var(--secondary)'/>
                    </div>
                    <div className={Style.commentNum}>共 200 則留言</div>
                    <div className={Style.line}>
                      <img className={Style.commentLine} src='/forum_img/commentLine.png'/>
                    </div>
                    <div className={Style.comments}>
                      <PostComment profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' author='狗狗世家' comment='看起來很不錯耶！謝謝原po推薦！' floor='B1' date='一天前' moreComments='6'/>
                      <PostComment profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' author='哈嚕屁屁' comment='推推！原po好人一生平安！' floor='B2' date='10小時前' moreComments='4'/>
                      <PostComment profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' author='狗狗世家' comment='看起來很不錯耶！謝謝原po推薦！' floor='B1' date='一天前' moreComments='6'/>
                      <PostComment profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' author='哈嚕屁屁' comment='推推！原po好人一生平安！' floor='B2' date='10小時前' moreComments='4'/>
                    </div>
                  </div>
                  <div className={Style.PostCommentLaunch}>
                    <PostCommentLaunch profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg'/>
                  </div>
                  
              </div>
            </div>
        </div>
        <PostBottom/>
    
    </div>
  )
}
