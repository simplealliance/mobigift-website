import React,{ useEffect } from "react";
import { termsDetails } from "./terms.details";
import { isMobileWidth, isTabletWidth } from "../../../utility/Utils";
import { Helmet } from "react-helmet";
import clsx from "clsx";
import logo from "@src/assets/images/logo/logo_full.png";

export default function Terms() {
  const mobileWidth = isMobileWidth();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, []);

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column">
      <Helmet>
        <title>Legal - Website Terms of Use | Mobigift</title>
        <meta
          name="description"
          content="Mobigift is the rewarding way to buy Airtime!"
        />
      </Helmet>
      <div className="d-flex w-100">
        <img src={logo} alt="mobigift" width="300px" height="77px" />
      </div>
      <div
        className={clsx(
          "container-box",
          !mobileWidth && "w-85 p-4",
          mobileWidth && "w-90 p-3"
        )}
      >
        <h1 className="display-4">Terms of Service</h1>
        <p className="pt-3 display-5">Effective June 15th, 2022.</p>
        {termsDetails.map((data, index) => (
          <div className="pt-2 pb-2" key={index}>
            <h2 className="display-3 font-bold">{data.name}</h2>
            {data.details.map((detail, index) => (
              <p className="pt-2 display-5" key={index}>
                {detail.description}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
