import { useRouter } from 'next/router'

export default function StoreProductName() {
  const { query, asPath } = useRouter()

  return (
    <div>
      <div>Name: {query.name}</div>
      <div>Path: {asPath}</div>
    </div>
  )
}
