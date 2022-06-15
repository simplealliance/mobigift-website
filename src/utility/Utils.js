import { useMediaQuery } from "react-responsive";

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData");
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "admin") return "/";
  if (userRole === "client") return "/access-control";
  return "/login";
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed", // for input hover border-color
  },
});

export const lsSecret = 19992000;
export const GOOGLE_API_KEY = "AIzaSyD6AUPIR0eIiGldIIo0b06uqLxlZDyQh-I";
// AIzaSyBFoB0sOn7DspfLNL4ZxO1VrN30vGhjDrs

export const isMobileWidth = () => {
  return useMediaQuery({ maxWidth: "575.98px" });
};

export const isTabletWidth = () => {
  // 768px
  return useMediaQuery({ minWidth: "576px", maxWidth: "991.98px" });
};

export const isDesktopWidth = () => {
  return useMediaQuery({ minWidth: "992px", maxWidth: "1199.98px" });
};

export const isLargeDesktopWidth = () => {
  return useMediaQuery({ minWidth: "1200px" });
};

export const idGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

export function formatAmount(amount) {
  if (amount === undefined || amount === "") return "";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatAmountV1(amount, offset = 3) {
  if (amount === undefined || amount === "") return "";
  var re = new RegExp("\\B(?=(\\d{" + offset + "})+(?!\\d))", "g");
  var amount = parseFloat(amount);
  return (
    amount &&
    amount.toFixed(2) &&
    amount.toFixed(2).toString() &&
    amount.toFixed(2).toString().replace(re, ",")
  );
}

export function formatDateToIso(date) {
  if (date === undefined || date === "") return "";
  let now = new Date(date);
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
   return now.toISOString().slice(0, 10)
}

export function textCapitalize(string) {
  if (!string) return "";
    return string.toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase())  
}

export function downloadURL(dataUrl, fileName) {
  // const link = document.createElement("a");
  // link.href = dataUrl
  // link.download = fileName;
  // document.body.appendChild(link);
  // link.click();

  fetch(dataUrl)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
  })
  .catch(console.error);
}

export function timeSince(date) {
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find(i => i.seconds < seconds);
  const count = Math.floor(seconds / interval?.seconds);
  return interval?.label ? `${count} ${interval?.label}${count !== 1 ? 's' : ''} ago` : "";
}

export function splitForName(name) {
  if(name){
    const firstWord = name.split(' ')[0]; 
    const lastWord = name.substring(name.lastIndexOf(' ') + 1);
    return (firstWord === name && lastWord === name) ? firstWord :  firstWord + " " + lastWord
  }
  return ""
}

// export const webUrl = "http://localhost:3000"
export const webUrl = "https://jsonone.vercel.app"
export const validAlphaNumeric = /^[a-zA-Z0-9]+$/
export const validUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
export const validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;