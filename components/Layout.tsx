import Footer from "./Footer";
import HowToBuy from "./Home/HowToBuy";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      {children}
      <HowToBuy />
      <Footer />
    </div>
  );
};

export default Layout;
