import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import { RecoilRoot } from "recoil";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <CssBaseline />
            <App />
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root")
);
