import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useSkin } from "@hooks/useSkin";
import "@styles/base/pages/page-misc.scss";
import logo from "@src/assets/images/logo/logo.png";
import errorImage from "@src/assets/images/pages/error.svg"

const Error = () => {

  return (
    <div className="misc-wrapper">
      <Link className="brand-logo d-flex align-items-center" to="/">
        <img src={logo} alt="mobigift" width="48px" height="46px" />
        <h2 className="brand-text text-primary ms-1">Mobigift</h2>
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">Page Not Found 🕵🏻‍♀️</h2>
          <p className="mb-2">
            Oops! 😖 The requested URL was not found on this server.
          </p>
          <Button
            tag={Link}
            to="/"
            color="primary"
            className="btn-sm-block mb-2"
          >
            Back to home
          </Button>
          <img className="img-fluid" src={errorImage} alt="Not authorized page" />
        </div>
      </div>
    </div>
  );
};
export default Error;
