import React  from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import { useLocation } from "wouter";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

export const TopBar: React.FC<{}> = ():JSX.Element => {
    const classes = useStyles();
    const [, setLocation] = useLocation();

    return ( 
        <div className={classes.root}>
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    My Books
                </Typography>
                <IconButton
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    <SettingsIcon onClick={() => setLocation("/settings")}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    </div>
    );
}