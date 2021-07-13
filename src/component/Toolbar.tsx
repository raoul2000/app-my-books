import React from "react";
import { useSetRecoilState } from "recoil";
import { useLocation } from "wouter";
import { loadingState } from "../state/loading";

export const Toolbar: React.FC<{}> = (): JSX.Element => {
    const [, setLocation] = useLocation();
    const setLoading = useSetRecoilState(loadingState);
    const handleReloadBookList = () => {
        alert('not implemented yet !');
        //setLoading({ isLoading: true, infoMessage: "reloading ..." });
    };

    return (
        <div className="toolbar">
            <button
                onClick={() => {
                    setLocation("/add");
                }}
            >
                add book
            </button>
            <button onClick={() => handleReloadBookList()}>
                Reload Book list
            </button>
            <button
                onClick={() => {
                    setLocation("/about");
                }}
            >
                About
            </button>
        </div>
    );
};
