import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "wouter";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { Theme } from '@mui/material/styles';

export const AboutBar: React.FC<{}> = (): JSX.Element => {
    const [, setLocation] = useLocation();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    sx={{
                        color: "white",
                        marginRight: (theme: Theme) => theme.spacing(2),
                    }}
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setLocation("/")}
                >
                    <ArrowBackIosIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
