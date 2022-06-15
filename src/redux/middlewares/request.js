import axios from "axios";
import { API, apiStart, apiError } from "../actions/default.actions";
import { SERVER_URL } from "../middlewares/api.config";
import ls from "localstorage-slim";
import { lsSecret } from "@src/utility/Utils";

const request =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type !== API) return;

    const { path, method, data, onSuccess, label, contentType } =
      action.payload;
    const url = `${SERVER_URL}/${path}`;

    axios.defaults.headers.common["Content-Type"] = contentType
      ? contentType
      : "application/json";
    if (ls.get("userData")) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${
        ls.get("userData", { decrypt: true, secret: lsSecret }).token
      }`;
    }

    if (label) {
      dispatch(apiStart({ label, data }));
    }

    axios
      .request({
        url,
        method,
        data,
      })
      .then(({ data }) => {
        dispatch(onSuccess(data));
      })
      .catch((error) => {
        if (
          localStorage.getItem("userData") &&
          error.response?.status === 401
        ) {
          ls.remove("userData");
          window.location.href = "/login";
        } else {
          dispatch(
            apiError({
              label,
              data,
              error: error.response ? 
                // error.response.status === 404
                //   ? error.response.statusText :
                   error.response.data
                  ? error.response.data.data &&
                    error.response.data.data.length !== 0 &&
                    typeof error.response.data.data === "object" &&
                    error.response.data.data !== null &&
                    Object.keys(error.response.data.data).length !== 0
                    ? error.response.data.data.errorMessage
                    : error.response.data.message
                  : error.response.statusText
                : error.message,
            })
          );
        }
      });
  };

export default request;
