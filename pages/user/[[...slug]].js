export default function SlugPage({ slug }) {
  // slug沒值是null
  console.log(slug)

  const adminPage = (
    <>
      <h1>User Admin</h1>
      <p>this is Amin page</p>
    </>
  )

  const UserPage = (
    <>
      <h1>User Page</h1>
      <p>this is Amin page</p>
    </>
  )

  return <>{slug && slug[0] === 'admin' ? adminPage : UserPage}</>
}

export async function getStaticProps({ params }) {
  // 範例內容 (這裡視情況fetch伺服器要求資料)

  // 這裡可以得到目前的網址參數(category, sub-category, id)
  console.log(params)

  return {
    props: {
      slug: params.slug || null, // 沒有slug要改傳null
    },
  }
}

export async function getStaticPaths() {
  // 範例內容 (這裡視情況fetch伺服器要求資料)
  const paths = [
    { params: { slug: [] } }, // 對應`/user`，沒有slug的情況
    { params: { slug: ['login'] } },
    { params: { slug: ['register'] } },
    { params: { slug: ['admin', 'order'] } },
    { params: { slug: ['admin', 'profile', 'edit'] } },
  ]

  return {
    paths,
    fallback: false,
  }
}
