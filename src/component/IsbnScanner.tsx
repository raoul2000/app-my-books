import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Alert from "@material-ui/lab/Alert";
import { BarcodeResult, CodeBarScanner } from "@/component/CodeBarScanner";
import Container from "@material-ui/core/Container";

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
            <main>
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
                            Scan the ISBN Code on the book
                        </Alert>
                        <CodeBarScanner
                            width="100%"
                            onScanResult={setScannedData}
                        />
                    </div>
                </Container>
            </main>
        </div>
    );
};
