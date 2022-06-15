import {
  REGISTER_USER,
  VERIFY_TOKEN,
  CREATE_PIN,
  LOGIN_USER,
  RESEND_OTP,
  FORGOT_PIN,
  VERIFY_FORGOT_PIN,
  SET_FORGOT_PIN,
  RESET_REGISTER,
  RESET_VERIFY_TOKEN,
  RESET_CREATE_PIN,
  RESET_LOGIN,
  RESET_FORGOT_PIN,
  RESET_VERIFY_FORGOT_PIN,
  RESET_SET_FORGOT_PIN,
  RESET_RESEND_OTP,
} from "../actions/auth.actions";
import { API_START, API_ERROR } from "../actions/default.actions";
import ls from 'localstorage-slim'
import { lsSecret } from '@src/utility/Utils'

export let authState = {
  registerResponse: { data: false, loading: false, error: false },
  loginResponse: { data: false, loading: false, error: false },
  verifyTokenResponse: { data: false, loading: false, error: false },
  pin: { data: false, loading: false, error: false },
  forgotPinResponse: { data: false, loading: false, error: false },
  verifyForgot: { data: false, loading: false, error: false },
  setPinResponse: { data: false, loading: false, error: false },
  resendOtpResponse: { data: false, loading: false, error: false },
};

export default function authReducer(state = authState, action) {
  const setData = (key, allData) => {
    const { ld, er, dt } = allData;
    const loading = ld ? ld : false;
    const error = er ? er : false;
    const data = dt ? dt : false;
    state = {
      ...state,
      [key]: { ...state[key], loading, error, data },
    };
  };

  const resetData = (key, allData) => {
    const { loading, error, data } = allData;
    let setNewData = {};
    setNewData.loading = loading !== "NO_RESET" ? loading : state[key].loading;
    setNewData.error = error !== "NO_RESET" ? error : state[key].error;
    setNewData.data = data !== "NO_RESET" ? data : state[key].data;
    state = {
      ...state,
      [key]: setNewData,
    };
  };

  switch (action.type) {
    // SET LOADING
    case API_START:
      switch (action.payload) {
        case REGISTER_USER:
          setData("registerResponse", { ld: true });
          return state;
        case LOGIN_USER:
          setData("loginResponse", { ld: true });
          return state;
        case VERIFY_TOKEN:
          setData("verifyTokenResponse", { ld: true });
          return state;
        case CREATE_PIN:
          setData("pin", { ld: true });
          return state;
        case FORGOT_PIN:
          setData("forgotPinResponse", { ld: true });
          return state;
        case VERIFY_FORGOT_PIN:
          setData("verifyForgot", { ld: true });
          return state;
        case SET_FORGOT_PIN:
          setData("setPinResponse", { ld: true });
          return state;
        case RESEND_OTP:
          setData("resendOtpResponse", { ld: true });
          return state;
        default:
          return state;
      }
    // SET ERROR
    case API_ERROR:
      switch (action.payload) {
        case REGISTER_USER:
          setData("registerResponse", { er: action.error });
          return state;
        case LOGIN_USER:
          setData("loginResponse", { er: action.error });
          return state;
        case VERIFY_TOKEN:
          setData("verifyTokenResponse", { er: action.error });
          return state;
        case CREATE_PIN:
          setData("pin", { er: action.error });
          return state;
        case FORGOT_PIN:
          setData("forgotPinResponse", { er: action.error });
          return state;
        case VERIFY_FORGOT_PIN:
          setData("verifyForgot", { er: action.error });
          return state;
        case SET_FORGOT_PIN:
          setData("setPinResponse", { er: action.error });
          return state;
        case RESEND_OTP:
          setData("resendOtpResponse", { er: action.error });
          return state;
        default:
          return state;
      }
    // SET DATA
    case REGISTER_USER:
      setData("registerResponse", { dt: action.response });
      return state;
    case LOGIN_USER:
      setData("loginResponse", { dt: action.response && action.response.data });
      ls.set('userData', action.response.data, {
        secret: lsSecret,
        encrypt: true,
      })
      return state;
    case VERIFY_TOKEN:
      setData("verifyTokenResponse", { dt: action.response });
      return state;
    case CREATE_PIN:
      setData("pin", { dt: action.response });
      return state;
    case FORGOT_PIN:
      setData("forgotPinResponse", { dt: action.response });
      return state;
    case VERIFY_FORGOT_PIN:
      setData("verifyForgot", { dt: action.response });
      return state;
    case SET_FORGOT_PIN:
      setData("setPinResponse", { dt: action.response });
      return state;
    case RESEND_OTP:
      setData("resendOtpResponse", { dt: action.response });
      return state;
    // RESET DATA
    case RESET_REGISTER:
      resetData("registerResponse", action.data);
      return state;
    case RESET_VERIFY_TOKEN:
      resetData("verifyTokenResponse", action.data);
      return state;
    case RESET_CREATE_PIN:
      resetData("pin", action.data);
      return state;
    case RESET_LOGIN:
      resetData("loginResponse", action.data);
      return state;
    case RESET_FORGOT_PIN:
      resetData("forgotPinResponse", action.data);
      return state;
    case RESET_VERIFY_FORGOT_PIN:
      resetData("verifyForgot", action.data);
      return state;
    case RESET_SET_FORGOT_PIN:
      resetData("setPinResponse", action.data);
      return state;
    case RESET_RESEND_OTP:
      resetData("resendOtpResponse", action.data);
      return state;

    default:
      return state;
  }
}
