import React, { useEffect } from "react";
import "./App.less";
import "@fontsource/roboto";

import { useRecoilState } from "recoil";
import { useLocation } from "wouter";

import { WithNavigation } from "./component/WithNavigation";
import Storage from "@/utils/storage";
import { apiKeyState } from "./state/api-key";

function App() {
    const [apiKey, setApiKey] = useRecoilState(apiKeyState);
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (Storage.hasApiKey()) {
            setApiKey(Storage.getApiKey());
        } else {
            setLocation("/signin");
        }
    }, [apiKey]);

    return (
        <div className="App">
            <WithNavigation />
        </div>
    );
}
export default App;
