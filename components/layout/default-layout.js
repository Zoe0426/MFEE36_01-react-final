import Navbar from './navbar'
import Footer from './footer'

export default function DefaultLayout({ children }) {
  return (
    <>
      <div className="container-outer">
        <Navbar />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  )
}
