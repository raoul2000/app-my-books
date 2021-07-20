import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import useLocation from "wouter/use-location";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import { FormSettings } from "../component/FormSettings";
import Divider from "@material-ui/core/Divider";
import { GoBackButton } from "../component/GoBackButton";

export const SettingsPage: React.FC<{}> = (): JSX.Element => {
    const [, setLocation] = useLocation();
    const [showNotif, setShowNotif] = useState(false);
    const goHome = () => {
        setShowNotif(true);
        setLocation("/");
    };

    return (
        <div className="settings">
            <GoBackButton to="/" label="Book list" />
            <Typography variant="h5" component="h1">
            Settings
                    </Typography>
            
            <FormSettings onSubmit={() => goHome()} />
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={false}
                autoHideDuration={6000}
                message="Note archived"
            />
        </div>
    );
};
