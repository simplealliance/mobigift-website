import React from "react";
import themeConfig from "@configs/themeConfig";
import facebook from "../../assets/images/avunja/icons/facebook.svg";
import instagram from "../../assets/images/avunja/icons/instagram.svg";
import twitter from "../../assets/images/avunja/icons/twitter.svg";
import { isMobileWidth, isTabletWidth } from "../../utility/Utils";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import clsx from "clsx";

export default function Footer() {
  const mobileWidth = isMobileWidth();
  const tabletWidth = isTabletWidth();
  const history = useHistory();

  return (
    <div className="footer-shadow w-100">
      <div
        className={clsx(
          "d-flex justify-content-around",
          mobileWidth && "flex-column align-items-center text-center",
          !tabletWidth && "m-5",
          tabletWidth && "m-3"
        )}
      >
        {/* 1st column */}
        <div>
          <div>
            <img
              onClick={() => history.push("/")}
              src={themeConfig.app.appLogoImage}
              alt="logo"
              className="cursor-pointer"
              style={{ maxWidth: "136px" }}
            />
          </div>
          <h3 className={clsx("font-regular mt-2")}>
            <Link
              to="/agent"
              className="cursor-pointer text-dark font-semibold"
            >
              Agent
            </Link>
          </h3>
          <h3 className={clsx("font-regular mt-1")}>
            <Link
              to="/business"
              className="cursor-pointer text-dark font-semibold"
            >
              Business
            </Link>
          </h3>
        </div>
        {/* 2nd column */}
        <div>
          <h4 className={clsx("font-semibold", mobileWidth && "mt-2")}>
            Features
          </h4>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            Account Opening
          </h5>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            Add Money (Topup)
          </h5>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            Withdraw
          </h5>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            Sales & Distribution
          </h5>
        </div>
        {/* 3rd column */}
        <div>
          <h4 className={clsx("font-semibold", mobileWidth && "mt-2")}>
            Extras
          </h4>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            Rewards
          </h5>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            Promotions
          </h5>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            Safety
          </h5>
        </div>
        {/* 4th column */}
        <div>
          <h4 className={clsx("font-semibold", mobileWidth && "mt-2")}>
            Company
          </h4>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            About Us
          </h5>
          <h5 className="font-regular text-light cursor-pointer mt-1">Blog</h5>
          <div className="mt-1">
            <Link
              to="/contact-us"
              className="font-regular text-light cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
        </div>
        {/* 5th column */}
        <div>
          <h4 className={clsx("font-semibold", mobileWidth && "mt-2")}>
            Follow
          </h4>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            <img src={facebook} alt="facebook" width="16px" height="16px" />
            <span className="ms-1">Facebook</span>
          </h5>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            <img src={instagram} alt="instagram" width="16px" height="16px" />
            <span className="ms-1">Instagram</span>
          </h5>
          <h5 className="font-regular text-light cursor-pointer mt-1">
            <img src={twitter} alt="twitter" width="16px" height="16px" />
            <span className="ms-1">Twitter</span>
          </h5>
        </div>
      </div>
      <div
        className={clsx(
          "d-flex justify-content-center align-items-center text-center",
          mobileWidth && "flex-column-reverse mt-1",
          !mobileWidth && "mt-5"
        )}
      >
        <h6 className={clsx("", mobileWidth && "mt-1")}>
          © 2020 - 2022 Avunja Mobile Ltd
        </h6>
        <div className={clsx(mobileWidth && "mt-1", !mobileWidth && "ms-3")}>
          <Link
            to="/terms-of-service"
            className="font-regular text-light cursor-pointer"
          >
            Terms of Service
          </Link>
        </div>
        <div className={clsx(mobileWidth && "mt-1", !mobileWidth && "ms-3")}>
          <Link
            to="/privacy-policy"
            className="font-regular text-light cursor-pointer"
          >
            Privacy Policy
          </Link>
        </div>
        <h5
          className={clsx(
            "font-regular text-light cursor-pointer",
            mobileWidth && "mt-1",
            !mobileWidth && "ms-3"
          )}
        >
          Community Rules
        </h5>
      </div>
    </div>
  );
}
