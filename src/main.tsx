import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import { RecoilRoot } from "recoil";
import { useHashLocation } from "@/hooks/useHashLocation";
import { Router } from "wouter";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <CssBaseline />
            <Router hook={useHashLocation}>
                <App />
            </Router>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root")
);
