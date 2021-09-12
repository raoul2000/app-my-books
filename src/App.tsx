import React, { useEffect } from "react";
import "./App.less";
import "@fontsource/roboto";

import { useRecoilState } from "recoil";
import { useLocation, Router } from "wouter";

import { WithNavigation } from "./component/WithNavigation";
import Storage from "@/utils/storage";
import { apiKeyState } from "./state/api-key";
import { SnackbarProvider } from "notistack";
import {useHashLocation} from '@/hooks/useHashLocation';

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
        <Router hook={useHashLocation}>
        <SnackbarProvider>
            <div className="App">
                <WithNavigation />
            </div>
        </SnackbarProvider>
        </Router>
    );
}
export default App;
