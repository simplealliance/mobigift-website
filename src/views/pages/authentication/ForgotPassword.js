import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import "@styles/react/pages/page-authentication.scss";
import { Helmet } from "react-helmet";
import logo from "@src/assets/images/logo/logo.svg";
import forgotImage from "@src/assets/images/pages/forgot-password.png";
import { useState } from "react";
import { isValidForgotPassword } from "./validator";
import { forgotPin, resetForgotPin } from "@src/redux/actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import notify from "@src/common/toasts/toasts";
import { webUrl } from "@src/utility/Utils"

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { forgotPinResponse } = useSelector((state) => state.auth);

  const [state, setState] = useState({
    email: "",
  });

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValidForgotPassword(state).allValid) {
      dispatch(
        forgotPin({
          role: "client",
          email: state.email,
          link: webUrl,
        })
      );
    }
  };

  useEffect(() => {
    if (forgotPinResponse.data) {
      notify({
        type: "SUCCESS",
        message: forgotPinResponse.data?.message,
      });
    } else if (forgotPinResponse.error) {
      notify({
        type: "DANGER",
        message: forgotPinResponse.error,
      });
    }
  }, [forgotPinResponse.data, forgotPinResponse.error]);

  useEffect(() => {
    return () => {
      dispatch(
        resetForgotPin({
          data: false,
          loading: false,
          error: false,
        })
      );
    };
  }, []);

  return (
    <div className="auth-wrapper auth-cover">
      <Helmet>
        <title>Forgot Password | JSONONE</title>
        <meta name="description" content="JSONONE" />
      </Helmet>
      <Row className="auth-inner m-0">
        <Link className="brand-logo d-flex align-items-center" to="/">
          <img src={logo} alt="Jsonone" width="48px" height="36px" />
          <h2 className="brand-text text-primary ms-1">JSONONE</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img
              className="img-fluid"
              src={forgotImage}
              alt="Forgot Passwordd Cover"
            />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Forgot Password? 🔒
            </CardTitle>
            <CardText className="mb-2">
              Enter your email and we'll send you instructions to reset your
              password
            </CardText>
            <Form
              className="auth-forgot-password-form mt-2"
              onSubmit={onSubmit}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  placeholder="Enter Email Address"
                  value={state.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  autoFocus
                />
              </div>
              <Button
                color="primary"
                block
                onClick={onSubmit}
                disabled={
                  !isValidForgotPassword(state).allValid ||
                  forgotPinResponse.loading
                }
              >
                {forgotPinResponse.loading ? (
                  <Spinner size="sm" />
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </Form>
            <p className="text-center mt-2">
              <Link to="/login">
                <ChevronLeft className="rotate-rtl me-25" size={14} />
                <span className="align-middle">Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
