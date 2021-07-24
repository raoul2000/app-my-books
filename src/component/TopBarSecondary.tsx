import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useLocation } from "wouter";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        goBackButtonColor : {
            color:'white'
        }
    })
);

export const TopBarSecondary: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const [, setLocation] = useLocation();
    const handleGo = () => setLocation("/");

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Button
                    className={classes.goBackButtonColor}
                    startIcon={<ArrowBackIosIcon />}
                    onClick={handleGo}
                >
                    Back
                </Button>
            </Toolbar>
        </AppBar>
    );
};
