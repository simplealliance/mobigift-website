import React, { useEffect } from "react";
import { isMobileWidth, isTabletWidth } from "../../../utility/Utils";
import clsx from "clsx";
import { Helmet } from "react-helmet";
import CommingSoon from '../../pages/misc/ComingSoon'
import logo from "@src/assets/images/logo/logo.svg";

export default function Home() {
  const mobileWidth = isMobileWidth();
  const tabletWidth = isTabletWidth();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  return (
    <div className="mt-3 w-100 d-flex justify-content-center align-items-center flex-column">
      <Helmet>
        <title>Mobigift</title>
        <meta
          name="description"
          content="Mobigift is the rewarding way to buy Airtime!"
        />
      </Helmet>
      <div className="d-flex justify-content-center align-items-center" style={{height: "85vh"}}>
      <img src={logo}  />
          {/* <CommingSoon /> */}
      </div>
    </div>
  );
}
