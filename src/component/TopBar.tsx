import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MainMenu from "./MainMenu";
import CircularProgress from '@material-ui/core/CircularProgress';
import { progressState } from "../state/progress";
import { useRecoilValue } from "recoil";

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

export const TopBar: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const progress = useRecoilValue<boolean>(progressState);
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    My Books
                </Typography>
                {progress && <CircularProgress color="textPrimary" />}
                <MainMenu />
            </Toolbar>
        </AppBar>
    );
};


