import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
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
import logo from "@src/assets/images/logo/logo.svg";
import loginImage from "@src/assets/images/pages/login.png";
import { isValidLogin } from "./validator";
import { loginUser, resetLogin } from "@src/redux/actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import notify from "@src/common/toasts/toasts";
import { Helmet } from "react-helmet";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginResponse } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValidLogin(state).allValid) {
      dispatch(
        loginUser({
          role: "client",
          email: state.email,
          password: state.password,
        })
      );
    }
  };

  useEffect(() => {
    if (loginResponse.data) {
      history.push("/dashboard");
    } else if (loginResponse.error) {
      notify({
        type: "DANGER",
        message: loginResponse.error,
      });
    }
  }, [loginResponse.data, loginResponse.error]);

  useEffect(() => {
    return () => {
      dispatch(
        resetLogin({
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
        <title>Login | JSONONE</title>
        <meta name="description" content="JSONONE" />
      </Helmet>
      <Row className="auth-inner m-0">
        <Link className="brand-logo d-flex align-items-center" to="/">
          <img src={logo} alt="Jsonone" width="48px" height="36px" />
          <h2 className="brand-text text-primary ms-1">JSONONE</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={loginImage} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Login to your Account
            </CardTitle>
            <CardText className="mb-2">Sign in to continue</CardText>
            <Form className="auth-login-form mt-2" onSubmit={onSubmit}>
              <div className="mb-1">
                <Label className="form-label" for="register-email">
                  Email
                </Label>
                <Input
                  value={state.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  type="email"
                  id="login-email"
                  placeholder="Enter Email Address"
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  value={state.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter Password"
                  className="input-group-merge"
                  id="login-password"
                />
              </div>
              {/* <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div> */}
              <Button
                color="primary"
                onClick={onSubmit}
                block
                disabled={
                  !isValidLogin(state).allValid || loginResponse.loading
                }
              >
                {loginResponse.loading ? <Spinner size="sm" /> : "Sign in"}
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
