// ** React Imports
import { Fragment, useEffect, useState } from "react";
import NavbarUser from "./NavbarUser";
import NavbarBookmarks from "./NavbarBookmarks";
import { getProfile } from "@src/redux/actions/app.actions";
import { useDispatch, useSelector } from "react-redux";
import notify from "@src/common/toasts/toasts";
import { isUserLoggedIn } from "@src/utility/Utils";

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;
  const { profile } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile.data && isUserLoggedIn) {
      dispatch(getProfile());
    }
  }, []);

  useEffect(() => {
    if (profile.error) {
      notify({
        type: "DANGER",
        message: profile.error,
      });
    }
  }, [profile.error]);

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks
          setMenuVisibility={setMenuVisibility}
          userAccount={profile}
        />
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} userAccount={profile} />
    </Fragment>
  );
};

export default ThemeNavbar;
