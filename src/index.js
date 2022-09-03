// ** React Imports
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import ls from 'localstorage-slim'

// ** Redux Imports
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { initialState } from "./redux/reducers/init";

// ** Intl, CASL & ThemeColors Context
import ability from "./configs/acl/ability";
import { ToastContainer } from "react-toastify";
import { AbilityContext } from "./utility/context/Can";
import { ThemeContext } from "./utility/context/ThemeColors";

// ** i18n
import "./configs/i18n";

// ** Spinner (Splash Screen)
import Spinner from "./@core/components/spinner/Fallback-spinner";

// ** Ripple Button
import "./@core/components/ripple-button";

// ** Fake Database
import "./@fake-db";

// ** PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** React Toastify
import "@styles/react/libs/toastify/toastify.scss";

// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";

// ** Service Worker
import * as serviceWorker from "./serviceWorker";
import { lsSecret } from '@src/utility/Utils'

// ** Analytics
import GA4React, { useGA4React } from "ga-4-react";
const ga4react = new GA4React("G-K7CCXVR2HL");

function MyApp() {
  const testUser = ls.get("testUser", { decrypt: true, secret: lsSecret})
  const ga = useGA4React();

  return(
    testUser && testUser === "19992000tester123" ? <LazyApp /> : <TestApp />
  )
}

// ** Lazy load app
const LazyApp = lazy(() => import("./App"));
const TestApp = lazy(() => import('./TestApp'));
// const myStore = store(initialState)

(async () => {
  // await ga4react.initialize();
ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            <MyApp />
            <ToastContainer newestOnTop />
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
  </Provider>,
  document.getElementById("root")
)
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();