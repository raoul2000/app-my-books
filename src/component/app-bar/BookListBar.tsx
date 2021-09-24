import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { createStyles, makeStyles, Theme } from "@mui/styles";
import MainMenu from "../MainMenu";
import CircularProgress from "@mui/material/CircularProgress";
import { progressState } from "../../state/progress";
import { useRecoilValue } from "recoil";
import { useLocation } from "wouter";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1
        },
        progressColor: {
            color: "white",
        },
    })
);

export const BookListBar: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const progress = useRecoilValue<boolean>(progressState);
    const [, setLocation] = useLocation();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <div onClick={() => setLocation("/")}>My Books</div>
                </Typography>
                {progress && (
                    <CircularProgress className={classes.progressColor} />
                )}
                <MainMenu />
            </Toolbar>
        </AppBar>
    );
};
