import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { TimeContextProvider } from "./components/context/timeContext";
import { CurrentTimeContextProvider } from "./components/context/currentTimeContext";
import { RenderContextProvider } from "./components/context/renderContext";
import { WriteContextProvider } from "./components/context/writeContext";
import { GeneralContextProvider } from "./components/context/generalContext";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
 // <React.StrictMode>
    <TimeContextProvider>
      <CurrentTimeContextProvider>
        <RenderContextProvider>
          <WriteContextProvider>
            <GeneralContextProvider>
              <App />
            </GeneralContextProvider>
          </WriteContextProvider>
        </RenderContextProvider>
      </CurrentTimeContextProvider>
    </TimeContextProvider>,
 // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
