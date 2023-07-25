import Navbar from './navbar';
import Footer from './footer';
import Styles from './home-layout.module.css';
export default function HomeLayout({ children }) {
  return (
    <>
      <div className="container-outer">
        <Navbar type="home" />
        <main className={Styles.main}>{children}</main>
        <Footer type="home" />
      </div>
    </>
  );
}
