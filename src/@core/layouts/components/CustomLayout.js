import { useEffect, useState } from "react";
import Navbar from "../../../views/navbar/navbar";
import Footer from "../../../views/footer/footer";
import PublicRoutes from "../../../router/routes/Public";
import { useHistory } from "react-router-dom";

const CustomLayout = (props) => {
  const { children } = props;
  const [isMounted, setIsMounted] = useState(false);
  const history = useHistory();

  let routes = PublicRoutes.filter(
    (e) =>
      e.path === window.location.pathname ||
      window.location.pathname.includes("/shop/") && (window.location.pathname.split('').filter(chr => chr === "/").length === 2) ||
      window.location.pathname.includes("/blog/") && (window.location.pathname.split('').filter(chr => chr === "/").length === 2)
  );
  if (routes.length === 0) {
    history.push("/page-not-found");
  }

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="blank-page">
      {/* <Navbar /> */}
      <div className="mt-3 w-100" style={{ minHeight: "70vh" }}>
        {children}
      </div>
      {/* <div className="sectionSpace"></div>
      <Footer />
      <div className="sectionSpaceHalf">&nbsp;</div> */}
    </div>
  );
};

export default CustomLayout;
