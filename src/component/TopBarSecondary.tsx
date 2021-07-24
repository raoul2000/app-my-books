import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MainMenu from "./MainMenu";
import CircularProgress from "@material-ui/core/CircularProgress";
import { progressState } from "../state/progress";
import { useRecoilValue } from "recoil";
import { useLocation } from "wouter";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "wouter";

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
        progressColor: {
            color: "white",
        },
        goBackButtonColor : {
            color:'white'
        }
    })
);

export const TopBarSecondary: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const progress = useRecoilValue<boolean>(progressState);
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
                    <Link href="/"><span>Back</span></Link>
                </Button>
                {progress && (
                    <CircularProgress className={classes.progressColor} />
                )}
            </Toolbar>
        </AppBar>
    );
};
