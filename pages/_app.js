import '@/styles/globals.css'
// import '@/styles/home.module.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
