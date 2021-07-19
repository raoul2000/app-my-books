import React from "react";
import IconButton from "@material-ui/core/IconButton";
import useLocation from "wouter/use-location";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { FormSettings } from "../component/FormSettings";

export const SettingsPage: React.FC<{}> = (): JSX.Element => {
    const [, setLocation] = useLocation();
    const goHome = () => setLocation("/");
    
    return (
        <div className="settings">
            <IconButton
                aria-label="back"
                size="small"
                onClick={() => setLocation("/")}
            >
                <ArrowBackIosIcon fontSize="small" /> Book list
            </IconButton>
            <FormSettings onSubmit={() => goHome()} />
        </div>
    );
};
