import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import BookApi from "../api/book";
import { useLocation } from "wouter";
import { useSetRecoilState } from "recoil";
import { apiKeyState } from "@/state/api-key";
import Storage from "@/utils/storage";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type FormError = {
    username: boolean;
    password: boolean;
};

export const SignInPage: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [, setLocation] = useLocation();
    const setApiKey = useSetRecoilState(apiKeyState);
    const [formError, setFormError] = useState<FormError>({
        username: false,
        password: false,
    });

    const [username, setUsername] = useState<string>("");
    const [password, setpassword] = useState<string>("");

    const handleCloseSnackBar = (
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };
    const isFormValid = () => {
        if (!username || !password) {
            setFormError({
                username: !username,
                password: !password,
            });
            return false;
        }
        setFormError({
            username: false,
            password: false,
        });
        return true;
    };

    const handleLogin = () => {
        if (isFormValid()) {
            BookApi.login(username, password)
                .then((apiKey) => {
                    setApiKey(apiKey);
                    Storage.setApiKey(apiKey);
                    setLocation("/");
                })
                .catch((err) => {
                    setOpenSnackBar(true);
                    console.error(err);
                });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    My Books
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        error={formError.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={formError.password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message="login failed"
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleCloseSnackBar}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Container>
    );
};
