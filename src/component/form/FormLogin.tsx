import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { Theme } from "@mui/material/styles";
import BookApi from "@/api/book";

type FormError = {
    username: boolean;
    password: boolean;
};

type Props = {
    onSuccess: (apiKey: string) => void;
    onError: () => void;
};

export const FormLogin: React.FC<Props> = ({
    onSuccess,
    onError,
}): JSX.Element => {
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
                    setLoginInProgress(false);
                    onError();
                });
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                paddingTop: "50px",
            }}
        >
            <CssBaseline />
            <Box
                sx={{
                    marginTop: (theme: Theme) => theme.spacing(8),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Mes Livres
                </Typography>
                <Box
                    component="form"
                    sx={{
                        width: "100%", // Fix IE 11 issue.
                        marginTop: (theme: Theme) => theme.spacing(1),
                    }}
                    noValidate
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Pseudo ou email"
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
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="off"
                        disabled={loginInProgress}
                        error={formError.password}
                        onChange={(e) => setpassword(e.target.value)}
                    />

                    <Button
                        sx={{
                            margin: (theme: Theme) => theme.spacing(3, 0, 2),
                        }}
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        disabled={loginInProgress}
                    >
                        Se Connecter
                    </Button>
                    {loginInProgress && (
                        <Box>
                            <LinearProgress />
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};
