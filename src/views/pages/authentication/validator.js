import { validEmail } from "@src/utility/Utils";

export const isValidRegister = (data) => {
  const isValidFirstName = data.firstName && data.firstName !== "";
  const isValidLastName = data.lastName && data.lastName !== "";
  const isValidPhoneNumber = data.phoneNumber && data.phoneNumber !== "";
  const isValidEmail = data.email && validEmail.test(data.email);
  const isValidPassword =
    data.password && data.password?.length >= 6;
  const isValidAgreePrivacyAndTerms = data.agreePrivacyAndTerms;

  return {
    isValidPhoneNumber,
    isValidEmail,
    isValidPassword,
    isValidFirstName,
    isValidLastName,
    isValidAgreePrivacyAndTerms,
    allValid:
      isValidPhoneNumber &&
      isValidEmail &&
      isValidPassword &&
      isValidFirstName &&
      isValidLastName &&
      isValidAgreePrivacyAndTerms,
  };
};

export const isValidLogin = (data) => {
  const isValidEmail = data.email && validEmail.test(data.email);
  const isValidPassword =
    data.password && data.password?.length >= 6;

  return {
    isValidEmail,
    isValidPassword,
    allValid: isValidEmail && isValidPassword,
  };
};

export const isValidForgotPassword = (data) => {
  const isValidEmail = data.email && validEmail.test(data.email);

  return {
    isValidEmail,
    allValid: isValidEmail,
  };
};

export const isValidResetPassword = (data) => {
  const isValidPassword = data.password && data.password?.length >= 6;
  const isValidConfirmPassword =
    data.confirmPassword && data.confirmPassword?.length >= 6;
  const isPasswordMatch = data.password === data.confirmPassword;

  return {
    isValidPassword,
    isValidConfirmPassword,
    isPasswordMatch,
    allValid: isValidPassword && isValidConfirmPassword && isPasswordMatch,
  };
};
