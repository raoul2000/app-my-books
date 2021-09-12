import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import { RecoilRoot } from "recoil";
import { useHashLocation } from "@/hooks/useHashLocation";
import { Router } from "wouter";

ReactDOM.render(
    <React.StrictMode>
        <Router hook={useHashLocation}>
            <RecoilRoot>
                <CssBaseline />
                <App />
            </RecoilRoot>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
