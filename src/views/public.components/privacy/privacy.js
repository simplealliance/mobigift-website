import React, {useEffect} from "react";
import { privacyDetails } from "./privacy.details";
import { isMobileWidth, isTabletWidth } from "../../../utility/Utils";
import { Helmet } from "react-helmet";
import clsx from "clsx";
export default function Privacy() {
  const mobileWidth = isMobileWidth();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, []);

  const scrollToSection = (section) => {
    window.location.replace(`/privacy-policy/#${section}`)
  }

  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <Helmet>
        <title>Legal - Privacy Policy | Mobigift</title>
        <meta
          name="description"
          content="Mobigift is the rewarding way to buy Airtime!"
        />
      </Helmet>
      <div
        className={clsx(
          "container-box",
          !mobileWidth && "w-85 p-4",
          mobileWidth && "w-90 p-3"
        )}
      >
        <h1 className="display-4">Privacy and Data Policy</h1>
        <p className="pt-3 display-5">Effective March 1st, 2021.</p>
        {privacyDetails.map((data, index) => (
          <div className="pt-2 pb-2" key={index} id={data.section ? data.section : ""}>
            <h2 className={"display-3 font-bold"}>{data.name}</h2>
            {data.details.map((detail, index) => (
              <p
                className={clsx(
                  "display-5",
                  data.showWithoutPadding && "pt-0",
                  !data.showWithoutPadding && "pt-2",
                  !data.section && "cursor-pointer",
                  (index === 0 || index === 1) && "pt-2"
                )}
                onClick={() => !data.section && detail.scrollToSection ? scrollToSection(detail.scrollToSection): {}}
                key={index}
              >
                {detail.description}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
