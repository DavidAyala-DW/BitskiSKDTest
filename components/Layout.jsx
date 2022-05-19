import Navbar from "./Navbar";
import Footer from "./Footer";


const Layout = ({ children }) => {
  return (
    <div className="mx-auto w-full">
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
