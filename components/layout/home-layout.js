import HomeNavbar from './home-navbar';
import Footer from './footer';

export default function HomeLayout({ children }) {
  return (
    <>
      <div className="container-outer">
        <HomeNavbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
