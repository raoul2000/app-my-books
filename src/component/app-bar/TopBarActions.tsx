import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { useLocation } from "wouter";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flex: 1,
            justifyContent: "flex-end",
            color: "white",
            textAlign: "center",
        },
        submitButton: {
            color: "white",
        },
        backButton: {
            marginRight: theme.spacing(2),
        },
    })
);
type Props = {
    actions?: JSX.Element;
    showBack?: boolean;
    backPath?: string;
    title?:string;
};
export const TopBarActions: React.FC<Props> = ({
    title,
    actions,
    showBack = true,
    backPath = "/",
}): JSX.Element => {
    const classes = useStyles();
    const [, setLocation] = useLocation();

    return (
        <AppBar position="sticky">
            <Toolbar>
                {showBack && (
                    <IconButton
                        edge="start"
                        className={classes.backButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setLocation(backPath)}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                )}
                <Typography className={classes.title}>{title}</Typography>
                {actions}
            </Toolbar>
        </AppBar>
    );
};
