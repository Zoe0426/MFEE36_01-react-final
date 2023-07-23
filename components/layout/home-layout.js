import Navbar from './navbar';
import Footer from './footer';

export default function HomeLayout({ children }) {
  return (
    <>
      <div className="container-outer">
        <Navbar type="home" />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
