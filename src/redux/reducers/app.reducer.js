import {
  GET_COUNTRIES,
  GET_LANGUAGES,
  GET_BANKS,
  GET_NETWORKS,
  GET_BANK_PRICES,
  UPLOAD_FILE,
  ADD_CART_ITEM,
  UPDATE_CART,
  DELETE_CART_ITEM,
  SUBMIT_CONTACT_FORM,
  CHECKOUT,
  GET_PROFILE,
  GET_BALANCE,
  SEND_EMAIL_RECEIPT,
  RESET_CONTACT_FORM,
  RESET_CHECKOUT,
  RESET_UPLOAD_FILE,
  RESET_SEND_EMAIL_RECEIPT,
  LOGOUT,
} from "../actions/app.actions";
import { LOGIN_USER } from "../actions/auth.actions";
import { API_START, API_ERROR } from "../actions/default.actions";
import ls from "localstorage-slim";
import { lsSecret } from "@src/utility/Utils";

export let appState = {
  countries: { data: false, loading: false, error: false },
  languages: { data: false, loading: false, error: false },
  banks: { data: false, loading: false, error: false },
  networks: { data: false, loading: false, error: false },
  bankPrices: { data: false, loading: false, error: false },
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  contactForm: { data: false, loading: false, error: false },
  checkoutResponse: { data: false, loading: false, error: false },
  uploadFileResponse: { data: false, loading: false, error: false },
  profile: { data: false, loading: false, error: false },
  userProfileData: ls.get("userData", { decrypt: true, secret: lsSecret }),
  balance: { data: false, loading: false, error: false },
  sendEmailReceiptResponse: { data: false, loading: false, error: false },
};

export default function appReducer(state = appState, action) {
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

  const setDataDirect = (key, value) => {
    state = {
      ...state,
      [key]: value,
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
        case GET_COUNTRIES:
          setData("countries", { ld: true });
          return state;
        case GET_LANGUAGES:
          setData("languages", { ld: true });
          return state;
        case GET_BANKS:
          setData("banks", { ld: true });
          return state;
        case SUBMIT_CONTACT_FORM:
          setData("contactForm", { ld: true });
          return state;
        case CHECKOUT:
          setData("checkoutResponse", { ld: true });
          return state;
        case UPLOAD_FILE:
          setData("uploadFileResponse", { ld: true });
          return state;
        case GET_NETWORKS:
          setData("networks", { ld: true });
          return state;
        case GET_PROFILE:
          setData("profile", { ld: true });
          return state;
        case GET_BALANCE:
          setData("balance", { ld: true });
          return state;
        case SEND_EMAIL_RECEIPT:
          setData("sendEmailReceiptResponse", { ld: true });
          return state;
        case GET_BANK_PRICES:
          setData("bankPrices", { ld: true });
          return state;
        default:
          return state;
      }
    // SET ERROR
    case API_ERROR:
      switch (action.payload) {
        case GET_COUNTRIES:
          setData("countries", { er: action.error });
          return state;
        case GET_LANGUAGES:
          setData("languages", { er: action.error });
          return state;
        case GET_BANKS:
          setData("banks", { er: action.error });
          return state;
        case SUBMIT_CONTACT_FORM:
          setData("contactForm", { er: action.error });
          return state;
        case CHECKOUT:
          setData("checkoutResponse", { er: action.error });
          return state;
        case UPLOAD_FILE:
          setData("uploadFileResponse", { er: action.error });
          return state;
        case GET_NETWORKS:
          setData("networks", { er: action.error });
          return state;
        case GET_PROFILE:
          setData("profile", { er: action.error });
          return state;
        case GET_BALANCE:
          setData("balance", { er: action.error });
          return state;
        case SEND_EMAIL_RECEIPT:
          setData("sendEmailReceiptResponse", { er: action.error });
          return state;
        case GET_BANK_PRICES:
          setData("bankPrices", { er: action.error });
          return state;
        default:
          return state;
      }
    // SET DATA
    case GET_COUNTRIES:
      setData("countries", { dt: action.response?.data });
      return state;
    case GET_LANGUAGES:
      setData("languages", { dt: action.response?.data });
      return state;
    case GET_BANKS:
      setData("banks", { dt: action.response?.data });
      return state;
    case SUBMIT_CONTACT_FORM:
      setData("contactForm", { dt: action.response?.data });
      return state;
    case CHECKOUT:
      setData("checkoutResponse", { dt: action.response?.data });
      setDataDirect("cart", []);
      localStorage.removeItem("cart");
      return state;
    case ADD_CART_ITEM:
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.cart, action.data])
      );
      setDataDirect("cart", [...state.cart, action.data]);
      return state;
    case DELETE_CART_ITEM:
      const id = action.data.id;
      let cart = [...state.cart];
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
          cart.splice(i, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      setDataDirect("cart", cart);
      return state;
    case UPDATE_CART:
      localStorage.setItem("cart", JSON.stringify(action.data));
      setDataDirect("cart", action.data);
      return state;
    case UPLOAD_FILE:
      setData("uploadFileResponse", { dt: action.response?.data });
      return state;
    case GET_NETWORKS:
      setData("networks", { dt: action.response?.data });
      return state;
    case GET_PROFILE:
      setData("profile", { dt: action.response?.data });
      return state;
    case GET_BALANCE:
      setData("balance", { dt: action.response?.data });
      return state;
    case LOGIN_USER:
      setDataDirect(
        "userProfileData",
        ls.get("userData", { decrypt: true, secret: lsSecret })
      );
      return state;
    case SEND_EMAIL_RECEIPT:
      setData("sendEmailReceiptResponse", { dt: action.response?.data });
      return state;
    case GET_BANK_PRICES:
      setData("bankPrices", { dt: action.response?.data });
      return state;
    // RESET DATA
    case RESET_CONTACT_FORM:
      resetData("contactForm", action.data);
      return state;
    case RESET_CHECKOUT:
      resetData("checkoutResponse", action.data);
      return state;
    case RESET_UPLOAD_FILE:
      resetData("uploadFileResponse", action.data);
      return state;
    case RESET_SEND_EMAIL_RECEIPT:
      resetData("sendEmailReceiptResponse", action.data);
      return state;
    case LOGOUT:
      ls.remove("userData");
      return state;
    default:
      return state;
  }
}
