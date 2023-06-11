import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Product({ product }) {
  const { asPath } = useRouter()
  const { name, price } = product

  return (
    <>
      <h1>商品個別詳細頁</h1>
      <p>Name: {name}</p>
      <p>Path: {asPath}</p>
      <p>price: {price}</p>
      <Link href="/products">返回列表頁</Link>
    </>
  )
}

export async function getStaticProps({ params }) {
  // 範例內容 (這裡視情況fetch伺服器要求資料)
  const products = [
    {
      pid: '1',
      serial_number: 'DR0453-005',
      name: 'Nike Air Max Pulse',
      images: '',
      price: 4900,
    },
    {
      pid: '2',
      serial_number: 'FD1146-100',
      name: "Nike Air Force 1 '07 FlyEase",
      images: '',
      price: 3600,
    },
  ]

  // ex.{pid:'2'}
  console.log(params)
  // get product by id
  const product = products.find((v) => v.pid === params.pid)

  return {
    props: {
      product,
    },
  }
}

export async function getStaticPaths() {
  // 範例內容 (這裡視情況fetch伺服器要求資料)
  const products = [
    {
      pid: '1',
      serial_number: 'DR0453-005',
      name: 'Nike Air Max Pulse',
      images: '',
      price: 4900,
    },
    {
      pid: '2',
      serial_number: 'FD1146-100',
      name: "Nike Air Force 1 '07 FlyEase",
      images: '',
      price: 3600,
    },
  ]

  const paths = products.map((post) => {
    return {
      params: {
        pid: post.pid,
      },
    }
  })

  // [ { params: { id: '1' } }, { params: { id: '2' } } ]
  console.log(paths)

  return {
    paths,
    fallback: false,
  }
}
