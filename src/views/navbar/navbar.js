import React, { useState, useEffect } from "react";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import themeConfig from "@configs/themeConfig";
import { Link, useLocation } from "react-router-dom";
import * as Icon from "react-feather";
import IntlDropdown from "../../@core/layouts/components/navbar/IntlDropdown";
import NavbarSearch from "../../@core/layouts/components/navbar/NavbarSearch";
import CartDropdown from "../../@core/layouts/components/navbar/CartDropdown";
import { isMobileWidth, isTabletWidth } from "../../utility/Utils";
import clsx from "clsx";
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../../redux/actions/app.actions";
import UserDropdown from "../../@core/layouts/components/navbar/UserDropdown";
import { isUserLoggedIn } from "@utils";
// import { getUsersAccount } from "../../redux/actions/profile.actions";
import notify from "@src/common/toasts/toasts";

export default function Navbar() {
  const mobileWidth = isMobileWidth();
  const tabletWidth = isTabletWidth();
  const location = useLocation();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [placement, setPlacement] = useState("start");
  const [userData, setUserData] = useState(null);
  const toggle = () => setDrawerIsOpen(!drawerIsOpen);
  const { profile, userProfileData } = useSelector((state) => state.app);
  const { switchRoleResponse } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      dispatch(getUsersAccount({ id: userProfileData?.user._id }));
      if (!profile.data && !profile.loading) {
        dispatch(getProfile());
      }
    }
  }, []);

  useEffect(() => {
    if (profile.data) {
      setUserData(profile.data);
    } else {
      setUserData(userProfileData?.user);
    }
  }, [profile.data]);

  useEffect(() => {
    if (switchRoleResponse.data) {
      setUserData(switchRoleResponse.data?.data?.user);
      dispatch(getProfile());
    } else if (switchRoleResponse.error) {
      notify({
        type: "DANGER",
        message: switchRoleResponse.error,
      });
    }
  }, [switchRoleResponse.data, switchRoleResponse.error]);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div className="d-flex">
      <HorizontalLayout
        navbar={
          <div
            className={clsx(
              "w-75 d-flex  align-items-center navbar-container p-1",
              mobileWidth && "justify-content-start"
            )}
          >
            <>
              {(mobileWidth || tabletWidth) && (
                <div className={clsx("d-flex justify-content-start w-33")}>
                  <span onClick={toggle} className="cursor-pointer">
                    <Icon.Menu />
                  </span>
                </div>
              )}

              <Offcanvas
                direction={placement}
                isOpen={drawerIsOpen}
                toggle={toggle}
              >
                <OffcanvasHeader toggle={toggle}>
                  <span>
                    <img
                      src={themeConfig.app.appLogoImage}
                      alt="logo"
                      style={{ maxWidth: "136px" }}
                    />
                  </span>
                </OffcanvasHeader>
                <OffcanvasBody
                  className={classnames({
                    "my-auto mx-0 flex-grow-0":
                      placement === "start" || placement === "end",
                  })}
                >
                  <p
                    className={classnames({
                      "text-center":
                        placement === "start" || placement === "end",
                    })}
                  >
                    <div className="d-flex align-items-center justify-content-center flex-column nav">
                      <Link to="/agent">
                        <h3
                          className={clsx(
                            "cursor-pointer mt-2",
                            location.pathname.includes("agent") && "font-bold",
                            !location.pathname.includes("agent") &&
                              "font-semibold"
                          )}
                        >
                          {t("agent")}
                        </h3>
                      </Link>
                      <Link to="/business">
                        <h3
                          className={clsx(
                            "cursor-pointer mt-2",
                            location.pathname.includes("business") &&
                              "font-bold",
                            !location.pathname.includes("business") &&
                              "font-semibold"
                          )}
                        >
                          {t("business")}
                        </h3>
                      </Link>
                      <Link to="/shop">
                        <h3
                          className={clsx(
                            "cursor-pointer mt-2",
                            location.pathname.includes("shop") && "font-bold",
                            !location.pathname.includes("shop") &&
                              "font-semibold"
                          )}
                        >
                          {t("shop")}
                        </h3>
                      </Link>
                      <h3 className="font-semibold mt-2 cursor-pointer">
                        {t("about.us")}
                      </h3>
                      {/* <h3 className="font-semibold mt-2"><NavbarSearch /></h3> */}
                      <h3 className="font-semibold mt-2">
                        <IntlDropdown />
                      </h3>
                      {userData ? (
                        <UserDropdown
                          switchRoleResponse={switchRoleResponse}
                          toggle={
                            <h3
                              className="font-semibold mt-2 cursor-pointer"
                              // onClick={handleLogout}
                            >
                              {t("logout")} <Icon.ChevronDown />
                            </h3>
                          }
                          secondToggle={
                            <Link to="/login">
                              <h3 className="font-semibold mt-2 cursor-pointer">
                                {t("login")} <Icon.ChevronDown />
                              </h3>
                            </Link>
                          }
                          userData={userData}
                        />
                      ) : (
                        <Link to="/login">
                          <h3 className="font-semibold mt-2 cursor-pointer">
                            {t("login")} <Icon.ChevronDown />
                          </h3>
                        </Link>
                      )}
                    </div>
                  </p>
                </OffcanvasBody>
              </Offcanvas>
            </>
            {!tabletWidth && !mobileWidth ? (
              <div
                className={clsx(
                  "w-50 d-flex align-items-center flex-wrap",
                  mobileWidth && "justify-content-center ms-1",
                  !mobileWidth && !tabletWidth && "ms-5"
                )}
              >
                <div className="w-40">
                  <Link to="/">
                    <span>
                      <img
                        src={themeConfig.app.appLogoImage}
                        alt="logo"
                        style={{ maxWidth: "136px" }}
                      />
                    </span>
                  </Link>
                </div>
                <div className="d-flex w-50 justify-content-around mx-1 align-items-center">
                  <Link to="/agent">
                    <h4
                      className={clsx(
                        "cursor-pointer",
                        location.pathname.includes("agent") && "font-bold",
                        !location.pathname.includes("agent") && "font-semibold"
                      )}
                    >
                      {t("agent")}
                    </h4>
                  </Link>
                  <span className="border-bold-line"></span>
                  <Link to="/business">
                    <h4
                      className={clsx(
                        "cursor-pointer",
                        location.pathname.includes("business") && "font-bold",
                        !location.pathname.includes("business") &&
                          "font-semibold"
                      )}
                    >
                      {t("business")}
                    </h4>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="w-40 d-flex justify-content-center">
                <Link to="/">
                  <span>
                    <img
                      src={themeConfig.app.appLogoImage}
                      alt="logo"
                      style={{ maxWidth: "136px" }}
                    />
                  </span>
                </Link>
              </div>
            )}

            {mobileWidth || tabletWidth ? (
              <span className="nav w-30 d-flex justify-content-end">
                <CartDropdown />
              </span>
            ) : null}
            <div></div>

            {!mobileWidth && !tabletWidth && (
              <div className="w-80 d-flex align-items-center justify-content-center me-5">
                <ul className="nav align-items-center w-80 ms-auto justify-content-around">
                  <Link to="/shop">
                    <h4
                      className={clsx(
                        "cursor-pointer",
                        location.pathname.includes("shop") && "font-bold",
                        !location.pathname.includes("shop") && "font-semibold"
                      )}
                    >
                      {t("shop")}
                    </h4>
                  </Link>
                  <h4 className="font-semibold cursor-pointer">
                    {t("about.us")}
                  </h4>
                  <NavbarSearch />
                  <IntlDropdown />
                  {userData ? (
                    <UserDropdown
                      switchRoleResponse={switchRoleResponse}
                      toggle={
                        <h4
                          className="font-semibold cursor-pointer"
                          // onClick={handleLogout}
                        >
                          {t("logout")} <Icon.ChevronDown />
                        </h4>
                      }
                      secondToggle={
                        <Link to="/login">
                          <h4 className="font-semibold cursor-pointer">
                            {t("login")} <Icon.ChevronDown />
                          </h4>
                        </Link>
                      }
                      userData={userData}
                    />
                  ) : (
                    <Link to="/login">
                      <h4 className="font-semibold cursor-pointer">
                        {t("login")} <Icon.ChevronDown />
                      </h4>
                    </Link>
                  )}
                  <CartDropdown />
                </ul>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
