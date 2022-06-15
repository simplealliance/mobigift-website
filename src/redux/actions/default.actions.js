import { lsSecret } from "@src/utility/Utils";
import ls from "localstorage-slim";

export const API_START = "API_START";
export const API_ERROR = "API_ERROR";
export const API = "API";

export const apiStart = ({ label, data }) => ({
  type: API_START,
  payload: label,
  data
});

export const apiError = ({ label, error, data }) => ({
  type: API_ERROR,
  payload: label,
  data,
  error,
});

export function apiAction({
  path = "",
  method = "GET",
  data = false,
  contentType = false,
  label = "",
  headersOverride = false,
}) {
  return {
    type: API,
    payload: {
      path,
      method,
      data,
      contentType,
      onSuccess: (response) => {
        return {
          type: label,
          response,
          data
        };
      },
      label,
      headersOverride,
    },
  };
}
