import Navbar from './navbar';
import Footer from './footer';
import Styles from './navbar.module.css';

export default function DefaultLayout({ children }) {
  return (
    <>
      <div className="container-outer">
        <Navbar />
        <div className="container-inner">
          <div className={Styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            inventore quam sit sunt, aspernatur possimus, officiis unde esse,
            ipsa hic amet labore ea architecto dolorem consequatur. Nihil atque
            architecto provident ea unde quisquam nulla cumque mollitia beatae
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
