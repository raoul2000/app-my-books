import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import CropFreeIcon from "@material-ui/icons/CropFree";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

import { FormLogin } from "@/component/form/FormLogin";
import { useLocation } from "wouter";
import { useSetRecoilState } from "recoil";
import Storage from "@/utils/storage";
import { loadingBooksState } from "@/state/loading-books";
import { ApiKeyScanner } from "@/component/ApiKeyScanner";
import { FabScanner } from "@/component/button/FabScanner";

const useStyles = makeStyles((theme) => ({
    fabQuickLogin: {
        position: "fixed",
        bottom: "1em",
        right: "1em",
    },
}));

export const SignInPage: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [, setLocation] = useLocation();
    const setLoadingBooks = useSetRecoilState(loadingBooksState);
    const [signInMethod, setSignInMethode] = useState<"login" | "apiKey">(
        "login"
    );

    const handleLoginSuccess = (apiKey: string) => {
        Storage.setApiKey(apiKey);
        setLoadingBooks({
            status: "init",
            errorMessage: "",
        });
        setLocation("/");
    };

    const handleLoginError = () => {
        enqueueSnackbar("Login failed", {
            variant: "error",
            anchorOrigin: {
                vertical: "top",
                horizontal: "center",
            },
        });
        if (signInMethod === "apiKey") {
            setSignInMethode("login");
        }
    };

    const handleCancelApiKeyScan = () => setSignInMethode("login");

    return (
        <Container>
            {signInMethod === "login" ? (
                <>
                    <FormLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                    />
                    <FabScanner onClick={() => setSignInMethode("apiKey")} />
                </>
            ) : (
                <ApiKeyScanner
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                    onCancel={handleCancelApiKeyScan}
                />
            )}
        </Container>
    );
};
