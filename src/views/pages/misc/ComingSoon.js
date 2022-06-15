import { Button, Form, Input, Row, Col } from "reactstrap";
import "@styles/base/pages/page-misc.scss";
import { Link } from "react-router-dom";
import logo from "@src/assets/images/logo/logo.svg";
import commingSoonImage from "@src/assets/images/pages/comming-soon.png";
import { Helmet } from "react-helmet";

const ComingSoon = () => {
  return (
    <div className="misc-wrapper">
      <Helmet>
        <title>Coming Soon | Mobigift</title>
        <meta name="description" content="Mobigift is the rewarding way to buy Airtime!" />
      </Helmet>
      <Link className="brand-logo d-flex align-items-center" to="/">
        <img src={logo} alt="Jsonone" width="48px" height="36px" />
        <h2 className="brand-text text-primary ms-1">Mobigift</h2>
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">We are launching soon 🚀</h2>
          <p className="mb-3">
            We're creating something awesome. Please subscribe to get notified
            when it's ready!
          </p>
          <Form
            tag={Row}
            onSubmit={(e) => e.preventDefault()}
            className="row-cols-md-auto justify-content-center align-items-center m-0 mb-2 gx-3"
          >
            <Col sm="12" className="m-0 mb-1">
              <Input placeholder="john@example.com" />
            </Col>
            <Col sm="12" className="d-md-block d-grid ps-md-0 ps-auto">
              <Button className="mb-1 btn-sm-block" color="primary">
                Notify
              </Button>
            </Col>
          </Form>
          <img
            className="img-fluid"
            src={commingSoonImage}
            alt="Coming soon page"
          />
        </div>
      </div>
    </div>
  );
};
export default ComingSoon;
