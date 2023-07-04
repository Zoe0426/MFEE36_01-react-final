import Navbar from './navbar';
import Footer from './footer';
import Styles from './default-layout.module.css';

export default function DefaultLayout({ children }) {
  return (
    <>
      <div className="container-outer">
        <Navbar />
        <main className={Styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
