import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import { useLocation } from "wouter";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useRecoilValue } from "recoil";
import { bookFormState } from "@/state/book-form";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title : {
            flex:1,
            justifyContent:"flex-end",
            color: "white",
            textAlign: "center"
        },
        submitButton: {
            color: "white"
        },
        backButton: {
            marginRight: theme.spacing(2)
        },
    })
);

export const TopBarForm: React.FC<{}> = (): JSX.Element => {
    const bookForm = useRecoilValue(bookFormState);
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

                <Typography className={classes.title}></Typography>                

                <Button
                    className={classes.submitButton}
                    startIcon={<SaveIcon />}
                    onClick={() => bookForm.onSubmit()}
                >
                    Enregistrer
                </Button>
            </Toolbar>
        </AppBar>
    );
};
