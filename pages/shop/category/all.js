import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import CTAButton from '@/components/common/cta-button'
import { loadJson } from '@/utils/load-json-file'

export default function All({ categories }) {
  return (
    <>
      <Head>
        <title>商品類別</title>
      </Head>
      <h1>商品類別</h1>
      <Image
        width={250}
        height={120}
        src="https://via.placeholder.com/250x120?text=hello%2Bworld"
        alt=""
      />
      <ul>
        {categories.map((v, i) => {
          return (
            <li key={v.id}>
              <Link href={`/shop/category/${v.slug}`} passHref>
                <CTAButton color="red">{v.title}</CTAButton>
              </Link>
              <Link href={`/shop/category/${v.slug}`}>{v.title}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const categories = await loadJson('/data/product/categories.json')

  return {
    props: categories,
  }
}
