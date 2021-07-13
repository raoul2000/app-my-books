import React from "react";
import { useLocation } from "wouter";


export const Toolbar: React.FC<{}> = (): JSX.Element => {
    const [, setLocation] = useLocation();
    return (
        <div className="toolbar">
            <button onClick={() => {setLocation('/add');}}>add book</button>
            <button onClick={() => {setLocation('/about');} }>About</button>
        </div>
    )
};
