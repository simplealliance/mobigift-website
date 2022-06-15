import { useEffect, useState } from "react";
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
  Dropdown,
  InputGroup,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import "@styles/react/pages/page-authentication.scss";
import logo from "@src/assets/images/logo/logo.svg";
import registerImage from "@src/assets/images/pages/register.png";
import verifyEmail from "@src/assets/images/pages/verify-email.png";
import { Helmet } from "react-helmet";
import { isValidRegister } from "./validator";
import { registerUser, resetRegister } from "@src/redux/actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import notify from "@src/common/toasts/toasts";
import ReactCountryFlag from "react-country-flag";
import { webUrl } from "@src/utility/Utils";
import { resendOtp, resetResendOtp } from "@src/redux/actions/auth.actions";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { registerResponse, resendOtpResponse } = useSelector((state) => state.auth);
  const { countries } = useSelector((state) => state.app);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    agreePrivacyAndTerms: false,
  });
  const [selectedCountry, setSelectedCountry] = useState({});

  const handleChange = (name, value) => {
    if (name === "phoneNumber" && value !== "") {
      if (value.match(/^[0-9]+$/) && value.length <= 15) {
        setState({ ...state, [name]: value });
      }
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValidRegister(state).allValid) {
      dispatch(
        registerUser({
          role: "client",
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          phoneNumber: selectedCountry?.countryCode + state.phoneNumber,
          country: selectedCountry._id,
          link: webUrl,
        })
      );
    }
  };

  const resend = (e) => {
    e.preventDefault()
    dispatch(resendOtp({
      role: "client",
      email: state.email,
      link: webUrl,
    }))
  }

  useEffect(() => {
    if (registerResponse.error) {
      notify({
        type: "DANGER",
        message: registerResponse.error,
      });
    }
  }, [registerResponse.error]);

  useEffect(() => {
    if (resendOtpResponse.data) {
      notify({
        type: "SUCCESS",
        message: "Link Resended Successfully",
      });
    } else if (resendOtpResponse.error) {
      notify({
        type: "DANGER",
        message: resendOtpResponse.error,
      });
    }
  }, [resendOtpResponse.data, resendOtpResponse.error]);

  useEffect(() => {
    if (countries) {
      setSelectedCountry(countries.data.length !== 0 ? countries.data[0] : {});
    }
  }, [countries]);

  useEffect(() => {
    return () => {
      dispatch(
        resetRegister({
          data: false,
          loading: false,
          error: false,
        })
      );
      dispatch(
        resetResendOtp({
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
        <title>
          {registerResponse.data ? "Verify Email" : "Register"} | JSONONE
        </title>
        <meta name="description" content="JSONONE" />
      </Helmet>
      <Row className="auth-inner m-0">
        <Link className="brand-logo d-flex align-items-center" to="/">
          <img src={logo} alt="Jsonone" width="48px" height="36px" />
          <h2 className="brand-text text-primary ms-1">JSONONE</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            {registerResponse.data ? (
              <img
                className="img-fluid"
                src={verifyEmail}
                alt="Verify Email Cover"
              />
            ) : (
              <img
                className="img-fluid"
                src={registerImage}
                alt="Register Cover"
              />
            )}
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            {registerResponse.data ? (
              <>
                <CardTitle tag="h2" className="fw-bolder mb-1">
                  Verify your email ✉️
                </CardTitle>
                <CardText className="mb-2">
                  We've sent a link to your email address:{" "}
                  <span className="fw-bolder">{state.email}</span> Please follow
                  the link inside to continue.
                </CardText>
                <Button block tag={Link} to="/login" color="primary">
                  Skip for now
                </Button>
                <p className="text-center mt-2">
                  <span>Didn't receive an email? </span>
                  <a href="/" onClick={resend}>
                    {
                      resendOtpResponse.loading ?
                      <Spinner size="sm" />:
                      <span>Resend</span>
                    }
                  </a>
                </p>
              </>
            ) : (
              <>
                <CardTitle tag="h2" className="fw-bold mb-1">
                  Register a New Account
                </CardTitle>
                <CardText className="mb-2">Register to continue</CardText>
                <Form className="auth-register-form mt-2" onSubmit={onSubmit}>
                  <div className="mb-1">
                    <Label className="form-label" for="register-firstName">
                      First Name
                    </Label>
                    <Input
                      value={state.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      type="text"
                      id="register-firstName"
                      placeholder="Enter First Name"
                      autoFocus
                    />
                  </div>
                  <div className="mb-1">
                    <Label className="form-label" for="register-lastName">
                      Last Name
                    </Label>
                    <Input
                      value={state.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      type="text"
                      id="register-lastName"
                      placeholder="Enter Last Name"
                    />
                  </div>
                  <div className="mb-1">
                    <Label className="form-label" for="register-phoneNumber">
                      Phone Number
                    </Label>
                    <InputGroup>
                      <Dropdown
                        isOpen={state.dropdownIcon}
                        toggle={() =>
                          handleChange("dropdownIcon", !state.dropdownIcon)
                        }
                      >
                        <DropdownToggle
                          className="px-1 input-field-border"
                          caret
                          outline
                          style={{
                            width: "100px",
                            padding: "0px",
                            height: "38.28px",
                          }}
                        >
                          {countries && countries.loading ? (
                            <Spinner size="sm" color="primary" />
                          ) : (
                            <>
                              <ReactCountryFlag
                                countryCode={
                                  selectedCountry && selectedCountry.isoCode
                                    ? selectedCountry.isoCode
                                    : "KE"
                                }
                                style={{
                                  width: "1.4em",
                                  height: "1.4em",
                                }}
                                svg
                              />
                              <span style={{ marginLeft: "4px" }}>
                                {selectedCountry && selectedCountry.countryCode}
                              </span>
                            </>
                          )}
                        </DropdownToggle>
                        <DropdownMenu>
                          <div>
                            {countries && countries.data
                              ? countries.data.map((data) => (
                                  <DropdownItem
                                    key={data.isoCode}
                                    className="w-100"
                                    onClick={() => setSelectedCountry(data)}
                                  >
                                    <ReactCountryFlag
                                      countryCode={data.isoCode}
                                      style={{
                                        width: "1.4em",
                                        height: "1.4em",
                                      }}
                                      svg
                                    />
                                    <span style={{ marginLeft: "8px" }}>
                                      {data.countryCode}
                                    </span>
                                  </DropdownItem>
                                ))
                              : null}
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                      <Input
                        value={state.phoneNumber}
                        onChange={(e) =>
                          handleChange("phoneNumber", e.target.value)
                        }
                        type="number"
                        id="register-phoneNumber"
                        placeholder="Enter Phone Number"
                      />
                    </InputGroup>
                  </div>
                  <div className="mb-1">
                    <Label className="form-label" for="register-email">
                      Email
                    </Label>
                    <Input
                      value={state.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      type="email"
                      id="register-email"
                      placeholder="Enter Email Address"
                    />
                  </div>
                  <div className="mb-1">
                    <Label className="form-label" for="register-password">
                      Password
                    </Label>
                    <InputPasswordToggle
                      value={state.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="Enter Password"
                      className="input-group-merge"
                      id="register-password"
                    />
                  </div>
                  <div className="form-check mb-1">
                    <Input
                      type="checkbox"
                      id="terms"
                      onChange={() =>
                        handleChange(
                          "agreePrivacyAndTerms",
                          !state.agreePrivacyAndTerms
                        )
                      }
                    />
                    <Label className="form-check-label" for="terms">
                      I agree to
                      <Link className="ms-25 me-25" to="/privacy-policy">
                        privacy policy
                      </Link>
                      &
                      <Link className="ms-25" to="/terms-of-service">
                        terms of service
                      </Link>
                    </Label>
                  </div>
                  <Button
                    color="primary"
                    block
                    onClick={onSubmit}
                    disabled={
                      !isValidRegister(state).allValid ||
                      registerResponse.loading
                    }
                  >
                    {registerResponse.loading ? (
                      <Spinner size="sm" />
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </Form>
                <p className="text-center mt-2">
                  <span className="me-25">Already have an account?</span>
                  <Link to="/login">
                    <span>Sign in instead</span>
                  </Link>
                </p>
              </>
            )}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
