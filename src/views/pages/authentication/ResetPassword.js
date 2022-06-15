import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import InputPassword from "@components/input-password-toggle";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Button,
  Spinner,
} from "reactstrap";
import "@styles/react/pages/page-authentication.scss";
import { Helmet } from "react-helmet";
import logo from "@src/assets/images/logo/logo.svg";
import resetImage from "@src/assets/images/pages/reset-password.png";
import { isValidResetPassword } from "./validator";
import {
  setForgotPin,
  resetSetForgotPin,
} from "@src/redux/actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import notify from "@src/common/toasts/toasts";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();
  const { setPinResponse } = useSelector((state) => state.auth);

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValidResetPassword(state).allValid) {
      dispatch(
        setForgotPin({
          password: state.password,
          token: token,
        })
      );
    }
  };

  useEffect(() => {
    if (setPinResponse.data) {
      notify({
        type: "SUCCESS",
        message: "Password Updated Successfully",
      });
      history.push("/login");
    } else if (setPinResponse.error) {
      notify({
        type: "DANGER",
        message: setPinResponse.error,
      });
    }
  }, [setPinResponse.data, setPinResponse.error]);

  useEffect(() => {
    return () => {
      dispatch(
        resetSetForgotPin({
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
        <title>Reset Password | JSONONE</title>
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
              src={resetImage}
              alt="Reset Password Cover"
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
              Reset Password 🔒
            </CardTitle>
            <CardText className="mb-2">
              Your new password must be different from previously used passwords
            </CardText>
            <Form className="auth-reset-password-form mt-2" onSubmit={onSubmit}>
              <div className="mb-1">
                <Label className="form-label" for="new-password">
                  New Password
                </Label>
                <InputPassword
                  className="input-group-merge"
                  placeholder="Enter New Password"
                  id="new-password"
                  value={state.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="confirm-password">
                  Confirm Password
                </Label>
                <InputPassword
                  className="input-group-merge"
                  placeholder="Enter Confirm Password"
                  id="confirm-password"
                  value={state.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                />
              </div>
              <Button
                color="primary"
                block
                onClick={onSubmit}
                disabled={
                  !isValidResetPassword(state).allValid ||
                  setPinResponse.loading
                }
              >
                {setPinResponse.loading ? (
                  <Spinner size="sm" />
                ) : (
                  "Set New Password"
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

export default ResetPassword;
