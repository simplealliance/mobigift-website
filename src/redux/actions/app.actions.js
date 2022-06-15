import { apiAction } from "./default.actions";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_LANGUAGES = "GET_LANGUAGES";
export const GET_BANKS = "GET_BANKS"
export const GET_NETWORKS = "GET_NETWORKS";
export const GET_BANK_PRICES = "GET_BANK_PRICES";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";
export const SUBMIT_CONTACT_FORM = "SUBMIT_CONTACT_FORM";
export const CHECKOUT = "CHECKOUT";
export const GET_PROFILE = "GET_PROFILE";
export const GET_BALANCE = "GET_BALANCE";
export const SEND_EMAIL_RECEIPT = "SEND_EMAIL_RECEIPT";
export const RESET_CONTACT_FORM = "RESET_CONTACT_FORM";
export const RESET_CHECKOUT = "RESET_CHECKOUT";
export const RESET_UPLOAD_FILE = "RESET_UPLOAD_FILE";
export const RESET_SEND_EMAIL_RECEIPT = "RESET_SEND_EMAIL_RECEIPT";
export const LOGOUT = "LOGOUT";

export function getCountries() {
  return apiAction({
    path: "country/active",
    label: GET_COUNTRIES,
  });
}

export function getLanguages() {
  return apiAction({
    path: "languages",
    label: GET_LANGUAGES
  })
}

export function getBanks() {
  return apiAction({
    path: "banks",
    label: GET_BANKS
  })
}

export function getNetworks() {
  return apiAction({
    path: "telcos/active",
    label: GET_NETWORKS,
  });
}

export function getBankPrices(){
  return apiAction({
    path: "bank-prices",
    label: GET_BANK_PRICES,
  });
}

export function addCartItem(data) {
  return {
    type: ADD_CART_ITEM,
    data,
  };
}

export function updateCart(data) {
  return {
    type: UPDATE_CART,
    data,
  };
}

export function deleteCartItem(data) {
  return {
    type: DELETE_CART_ITEM,
    data,
  };
}

export function submitContactForm(data) {
  return apiAction({
    path: "groups",
    label: SUBMIT_CONTACT_FORM,
    method: "POST",
    data,
  });
}

export function resetContactForm(data) {
  return {
    type: RESET_CONTACT_FORM,
    data,
  };
}

export function checkOut(data) {
  return apiAction({
    path: "cart/web-checkout",
    label: CHECKOUT,
    method: "POST",
    data,
  });
}

export function uploadFile(data) {
  return apiAction({
    path: "file-upload/single",
    label: UPLOAD_FILE,
    method: "PUT",
    contentType: "multipart/form-data",
    data,
  });
}

export function getProfile() {
  return apiAction({
    path: "users/me",
    label: GET_PROFILE,
  });
}

export function getBalance() {
  return apiAction({
    path: "africastalking/balance",
    label: GET_BALANCE,
  });
}

export function sendEmailReceipt(data) {
  return apiAction({
    path: "send-airtime-reciept-mail",
    label: SEND_EMAIL_RECEIPT,
    method: "POST",
    data,
  });
}

export function resetCheckout(data) {
  return {
    type: RESET_CHECKOUT,
    data,
  };
}

export function resetUploadFile(data) {
  return {
    type: RESET_UPLOAD_FILE,
    data,
  };
}

export function resetSendEmailReceipt(data) {
  return {
    type: RESET_SEND_EMAIL_RECEIPT,
    data,
  };
}

export function logout(data) {
  return {
    type: LOGOUT,
    data,
  }; 
}