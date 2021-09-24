import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";

import BookApi from "@/api/book";

const useStyles = makeStyles((theme) => ({
    loginFormContainer: {
        paddingTop: "50px",
    },
    loginProgressContainer: {
        width: "100%",
    },
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
    }
}));

type FormError = {
    username: boolean;
    password: boolean;
};

type Props = {
    onSuccess: (apiKey:string) => void;
    onError: () => void;
};

export const FormLogin: React.FC<Props> = ({onSuccess, onError}):JSX.Element => {
    const classes = useStyles();
    const [loginInProgress, setLoginInProgress] = React.useState(false);
    const [formError, setFormError] = useState<FormError>({
        username: false,
        password: false,
    });

    const [username, setUsername] = useState<string>("");
    const [password, setpassword] = useState<string>("");

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
            setLoginInProgress(true);
            BookApi.login(username, password)
                .then(onSuccess)
                .catch((err) => {
                    setLoginInProgress(false)
                    onError();
                });
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            className={classes.loginFormContainer}
        >
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
                        autoComplete="off"
                        autoFocus
                        disabled={loginInProgress}
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
                        autoComplete="off"
                        disabled={loginInProgress}
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
                        disabled={loginInProgress}
                    >
                        Sign In
                    </Button>
                    <div className={classes.loginProgressContainer}>
                        <LinearProgress hidden={!loginInProgress} />
                    </div>
                </form>
            </div>
        </Container>
    );
};