import { useRouter } from 'next/router'

// 頁面元件，對照`/posts/[id].js`，因為是單一篇張貼文的元件，所以命名為`Post`單數詞
// `{ post }`是由`getStaticProps`最後回傳給此頁面元件的props(屬性)
// 即Next透過網址上獲得動態參數後，經由`getStaticProps`與`getStaticPaths`，
// `getStaticPaths`告訴`getStaticProps`有哪些參數值能用
// `getStaticProps`得到目前的網址參數後，找到對應的內容，然後傳給`Post`元件呈現
// 這是SSG要產生靜態網頁的必要過程
export default function Post({ post }) {
  const { asPath } = useRouter()
  const { title, content } = post

  return (
    <>
      <h1>Title: {title}</h1>
      <p>Path: {asPath}</p>
      <p>Content: {content}</p>
    </>
  )
}

// params: 在動態路由頁面中，專門配合getStaticPaths使用的，
// 代表目前context包含的params屬性，因參數同時可能不只一個，以複數名詞代表
// 例如頁面的名稱為`[id].js`，params參數物件會是像 `{ id: ... }`，其它屬性命名以此類推
export async function getStaticProps({ params }) {
  // 範例內容 (這裡視情況fetch伺服器要求資料)
  const posts = [
    {
      id: '1',
      title: '主角我覺得雖然',
      content: '主角我覺得雖然可以，我樹茶就好辦導演。',
    },
    {
      id: '2',
      title: '造火鍋能用',
      content: '不行了小後就，雙較其的圖真的很的衣服造火鍋能用。',
    },
  ]

  // ex.{id:'2'}
  console.log(params)
  // get post by id
  const post = posts.find((v) => v.id === params.id)

  return {
    props: {
      post,
    },
  }
}

// 回傳靜態路徑參數值，SSG預先渲染後產生對應的頁面使用。
// 注意，這裡需要產生所有可能的params(參數)物件，用於限制動態路由用(!!必要!!)。
// `{ fallback: false }`代表其它路由皆為404頁面。
export async function getStaticPaths() {
  // 範例內容 (這裡視情況fetch伺服器要求資料)
  const posts = [
    {
      id: '1',
      title: '主角我覺得雖然',
      content: '主角我覺得雖然可以，我樹茶就好辦導演。',
    },
    {
      id: '2',
      title: '造火鍋能用',
      content: '不行了小後就，雙較其的圖真的很的衣服造火鍋能用。',
    },
  ]

  const paths = posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    }
  })

  // [ { params: { id: '1' } }, { params: { id: '2' } } ]
  console.log(paths)

  return {
    paths,
    fallback: false,
    // fallback(備用)是`false`，代表所有沒有由getStaticPaths回傳的paths，
    // 將會是404頁面的結果。適合頁面少(數頁)的純SSG專案
    // !!! 以下"進階使用"注意 !!!
    // fallback(備用)是`true`，代表所有沒有由getStaticPaths回傳的paths，
    // 將不會出現404頁面，取而代之的是出現備用的回傳結果，例如"載入中…"訊息後，
    // 再出現頁面內容，Next會在接收到連結後作動態產生頁面之後快取的動作。
    // 適合頁面很多(數千頁)的SSG專案，如果進行預先產生大量靜態頁面，會造成長時間的打包時間
    //
    // fallback(備用)是`blocking`，不會出現404頁面，要搭配SSR使用。
  }
}
