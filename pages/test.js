import Image from 'next/image'
import ReactLogo from '@/components/icons/react-logo'
import Activity from '@/components/icons/activity'

export default function test() {
  return (
    <div style={{ backgroundColor: 'white', width: 500, height: 500 }}>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={100}
        height={24}
        priority
      />
      <ReactLogo color="#ff00aa" />
      <Activity width={500} height={500} />
    </div>
  )
}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: false,
//   }
// }
// export async function getStaticProps(ctx) {
//   return {
//     props: {
//       data: null,
//     },
//   }
// }
