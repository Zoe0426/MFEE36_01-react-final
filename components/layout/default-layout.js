import Navbar from './navbar'
import Footer from './footer'
import Styles from './navbar.module.css'

export default function DefaultLayout({ children }) {
  return (
    <>
      <div className="container-outer">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
