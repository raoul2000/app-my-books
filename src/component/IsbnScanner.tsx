import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Alert from "@mui/material/Alert";
import { BarcodeResult, CodeBarScanner } from "@/component/CodeBarScanner";
import Container from "@mui/material/Container";

type Props = {
    onSuccess: (isbn: string) => void;
    onError: () => void;
    onCancel: () => void;
};

export const IsbnScanner: React.FC<Props> = ({
    onSuccess,
    onError,
    onCancel,
}): JSX.Element => {
    const [scannedData, setScannedData] = useState<BarcodeResult | undefined>();

    useEffect(() => {
        if (scannedData) {
            onSuccess(scannedData.text);
        }
    }, [scannedData]);

    return (
        <div>
            <Container maxWidth="sm">
                <IconButton
                    color="primary"
                    aria-label="back"
                    onClick={onCancel}
                >
                    <ArrowBackIcon />
                </IconButton>

                <div>
                    <Alert severity="info">
                        Scannez le code ISBN du livre - Fonction expérimentale
                    </Alert>
                    <CodeBarScanner
                        width="100%"
                        onScanResult={setScannedData}
                    />
                </div>
            </Container>
        </div>
    );
};
