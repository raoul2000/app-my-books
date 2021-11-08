import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useSnackbar } from "notistack";
import { useLocation } from "wouter";
import { useSetRecoilState } from "recoil";

import { FormLogin } from "@/component/form/FormLogin";
import Storage from "@/utils/storage";
import { loadingBooksState } from "@/state/loading-books";
import { ApiKeyScanner } from "@/component/ApiKeyScanner";
import { FabScanner } from "@/component/button/FabScanner";

type Props = {
    externalApiKey?:string;
}
export const SignInPage: React.FC<Props> = ({externalApiKey}): JSX.Element => {
    const { enqueueSnackbar } = useSnackbar();
    const [, setLocation] = useLocation();
    const setLoadingBooks = useSetRecoilState(loadingBooksState);
    const [signInMethod, setSignInMethode] = useState<"login" | "apiKey">(
        "login"
    );

    console.log('key =' + externalApiKey);

    const handleLoginSuccess = (apiKey: string) => {
        Storage.setApiKey(apiKey);
        setLoadingBooks({
            status: "init",
            errorMessage: "",
        });
        setLocation("/");
    };
    useEffect(() => {
        if(externalApiKey) {
            handleLoginSuccess(externalApiKey);
        }
    })
    const handleLoginError = () => {
        enqueueSnackbar("Echec de connexion", {
            variant: "error",
            anchorOrigin: {
                vertical: "bottom",
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
