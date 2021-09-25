import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useLocation } from "wouter";

type Props = {
    actions?: JSX.Element;
    showBack?: boolean;
    backPath?: string;
    title?: string;
};
export const TopBarActions: React.FC<Props> = ({
    title,
    actions,
    showBack = true,
    backPath = "/",
}): JSX.Element => {
    const [, setLocation] = useLocation();

    return (
        <AppBar
            position="sticky"
            sx={{ display: "none", displayPrint: "block" }}
        >
            <Toolbar>
                {showBack && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setLocation(backPath)}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                )}
                <Typography
                    sx={{
                        flex: 1,
                        justifyContent: "flex-end",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    {title}
                </Typography>
                {actions}
            </Toolbar>
        </AppBar>
    );
};
