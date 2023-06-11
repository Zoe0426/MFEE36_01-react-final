import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { loadJson } from '@/utils/load-json-file'

// TODO: product list page by category? like `shop/nike/` for all product list? yes
// apple official store
// - `shop/buy-iphone` for all iphone list(like category landing page)
// - `shop/buy-iphone/iphone-14-pro` form one of product detail
// TODO: product list page for all? like `shop/all` for all ? NO don't use 'all' keyword it is a shxt word
// this page is only for product page
// use nice slug path `shop/[category]/[product]` to access page
// ex. `shop/nike/nike-air-max-pulse`
export default function ProductDetail({ product, category }) {
  const router = useRouter()
  console.log('router.query.slug', router.query.slug)

  console.log(product)
  console.log(category)

  return (
    <>
      <Head>
        {/* <title>{` ${category.title} | 商品類別`}</title> */}
        {/* <meta name="description" content={category.content} key="desc" />
        <meta name="keywords" content={category.keywords} /> */}
      </Head>
      {/* <p>Post: {router.query.slug}</p>
      <p>category name: {category.title}</p>
      <p>content: {category.content}</p> */}
      <p>name:{product?.name}</p>
      <p>description:{product?.description}</p>
      <p>category: {category?.title}</p>
      <button type="button" onClick={() => router.push('./category/all')}>
        All Categories
      </button>
    </>
  )
}

// 回傳路徑組成用
export async function getStaticPaths() {
  const categoryData = await loadJson('/data/product/categories.json')
  const categories = categoryData.categories
  const productData = await loadJson('/data/product/products.json')
  const products = productData.products
  // paths: [
  //     { params: { table: ["path1", "path2", "path3"] } },
  //   ],
  // paths: [
  //     { slug: { "nike" : [1, 2], "new-balance" :[3] } },
  //   ],
  // const paths = categoryData.categories.map((v) => {
  //   return {
  //     params: { slug: ['category', v.slug] },
  //   }
  // })

  // get category slug
  const categroySlug = (categories, categoryId) => {
    const category = categories.find((v) => String(v.id) === String(categoryId))

    if (!category) throw 'category id should be existed'
    return category.slug
  }

  // test paths valid
  // const paths = [{ params: { slug: ['nike', 'nike-air-max-pulse'] } }]

  // make valid paths
  const paths = products.map((v) => {
    return {
      params: { slug: [categroySlug(categories, v.category_id), v.slug] },
    }
  })

  console.log('paths', paths)

  return {
    // paths: [{ params: { pid: '1' } }, { params: { pid: '2' } }],
    paths,
    fallback: true, // See the "fallback" section below
  }
}

export async function getStaticProps(context) {
  const categoryData = await loadJson('/data/product/categories.json')
  const categories = categoryData.categories
  const productData = await loadJson('/data/product/products.json')
  const products = productData.products

  const slug = context.params.slug

  console.log('slug', slug)

  // TODO: if slug[1]==='all'or'' should pass it and use category list page

  // find this product(by slug)
  const product =
    products.find((v) => String(v.slug) === String(slug[1])) ??
    (() => {
      throw new TypeError('product slug error.')
    })()

  // find this category for this product (!!by STRING id!!)
  const category =
    categories.find((v) => String(v.id) === String(product.category_id)) ??
    (() => {
      throw new TypeError('category slug error.')
    })()

  // console.log('product', product)
  // console.log('category', category)

  return {
    props: { product, category },
  }
}
