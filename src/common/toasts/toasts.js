import Avatar from "@components/avatar";
import { AlertCircle, AlertTriangle, Check, X } from "react-feather";
import { toast } from "react-toastify";

export const ErrorToast = ({ data }) => (
  <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title ms-1">
          {data.title ? `${data.title}!` : "JSONONE!"}
        </h6>
      </div>
      <small className="text-muted">{data.smallTitle}</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {data.message}
      </span>
    </div>
  </>
);

export const SuccessToast = ({ data }) => (
  <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="toast-title ms-1">
          {data.title ? `${data.title}!` : "JSONONE!"}
        </h6>
      </div>
      <small className="text-muted">{data.smallTitle}</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {data.message}
      </span>
    </div>
  </>
);

export const InfoToast = ({ data }) => (
  <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="info" icon={<AlertCircle size={12} />} />
        <h6 className="toast-title ms-1">
          {data.title ? `${data.title}!` : "JSONONE!"}
        </h6>
      </div>
      <small className="text-muted">{data.smallTitle}</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {data.message}
      </span>
    </div>
  </>
);

const Toast = ({ data }) => (
  <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar
          size="sm"
          color={data?.type && data.type.toLowerCase()}
          icon={
            data?.type === "DANGER" ? (
              <X size={12} />
            ) : data?.type === "INFO" ? (
              <AlertCircle size={12} />
            ) : data.type === "SUCCESS" ? (
              <Check size={12} />
            ) : data?.type === "WARNING" ? (
              <AlertTriangle size={12} />
            ) : null
          }
        />
        <h6 className="toast-title ms-1">
          {data.title ? `${data.title}!` : "JSONONE!"}
        </h6>
      </div>
      <small className="text-muted">{data.smallTitle}</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {data.message}
      </span>
    </div>
  </>
);

export default function notify(data) {
  toast.info(<Toast />, {
    icon: false,
    hideProgressBar: true,
    data: data,
  });
}
