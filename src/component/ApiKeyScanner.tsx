import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Alert from "@mui/material/Alert";
import { BarcodeResult, CodeBarScanner } from "@/component/CodeBarScanner";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import BookApi from "@/api/book";

type Props = {
    onSuccess: (apiKey: string) => void;
    onError: () => void;
    onCancel: () => void;
};

export const ApiKeyScanner: React.FC<Props> = ({
    onSuccess,
    onError,
    onCancel,
}): JSX.Element => {
    const [scannedData, setScannedData] = useState<BarcodeResult | undefined>();

    useEffect(() => {
        if (scannedData) {
            // TODO: manage fecth abort on cleanup
            // see https://davidwalsh.name/cancel-fetch
            /* const controller = new AbortController();
                const { signal } = controller; */

            BookApi.checkApiKey(scannedData.text).then((isValid) => {
                if (isValid) {
                    onSuccess(scannedData.text);
                } else {
                    onError();
                }
            });
        }
    }, [scannedData]);

    const handleBackToLogin = () => onCancel();

    return (
        <div className="barcode">
            <Container maxWidth="sm">
                <IconButton
                    color="primary"
                    aria-label="back"
                    onClick={handleBackToLogin}
                >
                    <ArrowBackIcon />
                </IconButton>
                {scannedData ? (
                    <Typography
                        variant="h5"
                        component="h1"
                        align="center"
                        color="textSecondary"
                    >
                        <div>
                            <CircularProgress />
                        </div>
                        <div>Vérification en cours ...</div>
                    </Typography>
                ) : (
                    <>
                        <Alert severity="info">
                            Scan the QR Code from your account settings page
                        </Alert>
                        <CodeBarScanner
                            width="100%"
                            onScanResult={setScannedData}
                        />
                    </>
                )}
            </Container>
        </div>
    );
};
