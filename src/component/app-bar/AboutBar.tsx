import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { createStyles, makeStyles, Theme } from "@mui/styles";
import { useLocation } from "wouter";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backButton: {
            color: "white",
            marginRight: theme.spacing(2),
        },
    })
);

export const AboutBar: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const [, setLocation] = useLocation();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.backButton}
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
