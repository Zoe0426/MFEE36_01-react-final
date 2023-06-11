import Link from 'next/link'

export default function Products({ products }) {
  return (
    <>
      <h1>商品列表頁</h1>
      <ul>
        {products.map((v) => {
          return (
            <li key={v.pid}>
              <Link href={`/products/${v.pid}`}>{v.name}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export async function getStaticProps() {
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

  return {
    props: {
      products,
    },
  }
}
