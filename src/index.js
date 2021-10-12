import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
