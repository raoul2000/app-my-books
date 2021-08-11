import React, { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Alert from '@material-ui/lab/Alert';
import { BarcodeResult, CodeBarScanner } from "@/component/CodeBarScanner";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import BookApi from "@/api/book";

type Props = {
    onSuccess: (apiKey: string) => void;
    onError: () => void;
    onCancel: () => void;
};

export const ApiKeyScanner: React.FC<Props> = ({
    onSuccess,
    onError,
    onCancel
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
            <main>
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
                        <Alert severity="info">Scan the QR Code from your account settings page</Alert>
                        <CodeBarScanner
                            width="100%"
                            onScanResult={setScannedData}
                        />
                        </>
                    )}
                </Container>
            </main>
        </div>
    );
};
