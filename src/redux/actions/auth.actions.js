import { apiAction } from "./default.actions";
export const REGISTER_USER = "REGISTER_USER";
export const VERIFY_TOKEN = "VERIFY_TOKEN";
export const CREATE_PIN = "CREATE_PIN";
export const LOGIN_USER = "LOGIN_USER";
export const FORGOT_PIN = "FORGOT_PIN";
export const VERIFY_FORGOT_PIN = "VERIFY_FORGOT_PIN";
export const SET_FORGOT_PIN = "SET_FORGOT_PIN";
export const RESEND_OTP = "RESEND_OTP";

export const RESET_PIN = "RESET_PIN";
export const RESET_REGISTER = "RESET_REGISTER";
export const RESET_VERIFY_TOKEN = "RESET_VERIFY_TOKEN";
export const RESET_CREATE_PIN = "RESET_CREATE_PIN";
export const RESET_LOGIN = "RESET_LOGIN";
export const RESET_FORGOT_PIN = "RESET_FORGOT_PIN";
export const RESET_VERIFY_FORGOT_PIN = "RESET_VERIFY_FORGOT_PIN";
export const RESET_SET_FORGOT_PIN = "RESET_SET_FORGOT_PIN";
export const RESET_RESEND_OTP = "RESET_RESEND_OTP";

export function registerUser(data) {
  return apiAction({
    path: "users",
    label: REGISTER_USER,
    method: "POST",
    data,
  });
}

export function verifyToken(data) {
  return apiAction({
    path: `users/confirm/${data.token}`,
    label: VERIFY_TOKEN,
    method: "PATCH",
    data,
  });
}

export function createPin(data) {
  return apiAction({
    path: `users/create-pin/${data.id}`,
    label: CREATE_PIN,
    method: "POST",
    data,
  });
}

export function loginUser(data) {
  return apiAction({
    path: "auth",
    label: LOGIN_USER,
    method: "POST",
    data,
  });
}

export function forgotPin(data) {
  return apiAction({
    path: "password-reset",
    label: FORGOT_PIN,
    method: "POST",
    data,
  });
}

export function verifyForgotPin(data) {
  return apiAction({
    path: `password-reset/${data.token}`,
    label: VERIFY_FORGOT_PIN,
    data,
  });
}

export function setForgotPin(data) {
  return apiAction({
    path: `password-reset/${data.token}`,
    label: SET_FORGOT_PIN,
    method: "PUT",
    data,
  });
}

export function resendOtp(data) {
  return apiAction({
    path: "users/resend-verification-email",
    label: RESEND_OTP,
    method: "POST",
    data,
  });
}

export function resetRegister(data) {
  return {
    type: RESET_REGISTER,
    data,
  };
}

export function resetVerifyToken(data) {
  return {
    type: RESET_VERIFY_TOKEN,
    data,
  };
}

export function resetPin(data) {
  return {
    type: RESET_CREATE_PIN,
    data,
  };
}

export function resetLogin(data) {
  return {
    type: RESET_LOGIN,
    data,
  };
}

export function resetForgotPin(data) {
  return {
    type: RESET_FORGOT_PIN,
    data,
  };
}

export function resetVerifyForgotPin(data) {
  return {
    type: RESET_VERIFY_FORGOT_PIN,
    data,
  };
}

export function resetSetForgotPin(data) {
  return {
    type: RESET_SET_FORGOT_PIN,
    data,
  };
}

export function resetResendOtp(data) {
  return {
    type: RESET_RESEND_OTP,
    data,
  };
}
