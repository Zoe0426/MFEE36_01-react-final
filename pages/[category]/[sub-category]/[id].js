import { useRouter } from 'next/router'

export default function IdPage({ product }) {
  const { query, asPath } = useRouter()

  // { category: 'starbucks', 'sub-category': 'coffee', id: 'abc123' }
  console.log(query)

  return (
    <>
      <p>path: {asPath}</p>
      <p>category: {query.category}</p>
      <p>sub-category: {query['sub-category']}</p>
      <p>id:{query.id}</p>
      <p>Product Content: {product.content}</p>
    </>
  )
}

export async function getStaticProps({ params }) {
  // 範例內容 (這裡視情況fetch伺服器要求資料)
  const products = [
    { id: 'abc123', content: 'starbucks coffee' },
    { id: 'a001', content: 'starbucks cup' },
    { id: 'b002', content: 'louisa coffee' },
  ]

  // 這裡可以得到目前的網址參數(category, sub-category, id)
  console.log(params)
  // 範例: 由id得到對應的商品內容，傳遞給 IdPage 元件
  const product = products.find((v) => v.id === params.id)

  return {
    props: {
      product,
    },
  }
}

export async function getStaticPaths() {
  const paths = [
    {
      params: { category: 'starbucks', 'sub-category': 'coffee', id: 'abc123' },
    },
    { params: { category: 'starbucks', 'sub-category': 'cup', id: 'a001' } },
    { params: { category: 'louisa', 'sub-category': 'coffee', id: 'b002' } },
    //...
  ]
  return {
    paths,
    fallback: false,
  }
}
