import { useRouter } from 'next/router'

export default function FullName() {
  const { query, asPath } = useRouter()

  return (
    <div className="mx-auto my-12 text-3xl">
      <div>
        Name: {query.category} {query.name}
      </div>
      <div>Path: {asPath}</div>
    </div>
  )
}
