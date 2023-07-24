import SignNavbar from './SignNavbar';
import Navbar from './navbar';
import Footer from './footer';
import Styles from './sign-layout.module.css';

export default function SignLayout(children) {
  return (
    <>
      <div className="container-outer">
        <Navbar />
        {/* <SignNavbar /> */}
        <main className={Styles.main}>{children}</main>
        <Footer classTitle="bigNone" />
      </div>
    </>
  );
}
