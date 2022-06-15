import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { Row, Spinner } from "reactstrap";
import logo from "@src/assets/images/logo/logo.svg";
import { useParams } from "react-router-dom";
import { resetVerifyToken, verifyToken } from "@src/redux/actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import "@styles/react/pages/page-authentication.scss";

export default function VerifyEmail() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams();
  const { verifyTokenResponse } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyToken({
      token: token,
    }));
    return () => {
      dispatch(
        resetVerifyToken({
          data: false,
          loading: false,
          error: false,
        })
      );
    };
  }, []);

  useEffect(() => {
    if (verifyTokenResponse.data) {
      history.push("/login");
    }
  }, [verifyTokenResponse]);

  return (
    <div className="auth-wrapper auth-cover">
      <Helmet>
        <title>Verify Email | JSONONE</title>
        <meta name="description" content="JSONONE" />
      </Helmet>
      <Row className="auth-inner m-0">
        <Link className="brand-logo d-flex align-items-center" to="/">
          <img src={logo} alt="Jsonone" width="48px" height="36px" />
          <h2 className="brand-text text-primary ms-1">JSONONE</h2>
        </Link>
          {verifyTokenResponse.loading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner
                size=""
                style={{ width: "3rem", height: "3rem" }}
                color="primary"
              />
            </div>
          ) : verifyTokenResponse.error ? (
            <div className="font-bold display-3 text-primary d-flex justify-content-center align-items-center text-center h-100">
              {verifyTokenResponse.error}
            </div>
          ) : null}
      </Row>
    </div>
  );
}
