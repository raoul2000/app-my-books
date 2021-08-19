import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useLocation } from "wouter";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backButton : {
            color:'white',
            marginRight: theme.spacing(2)
        }
    })
);

export const TopBarSecondary: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const [, setLocation] = useLocation();
    const navigateToBookList = () => setLocation("/");

    return (
        <AppBar position="sticky">
            <Toolbar>
            <IconButton
                    edge="start"
                    className={classes.backButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={navigateToBookList}
                >
                    <ArrowBackIosIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
