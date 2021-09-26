import React, { useCallback, useRef, useState, useEffect } from "react";
import { BarcodeFormat, BrowserMultiFormatReader } from "@zxing/library";
import Webcam from "react-webcam";
import Box from "@mui/material/Box";

export type BarcodeResult = {
    text: string;
    format: BarcodeFormat;
};

type Props = {
    width?: string | number;
    height?: string | number;
    onScanResult: (result: BarcodeResult) => void;
};

export const CodeBarScanner: React.FC<Props> = ({
    width,
    height,
    onScanResult,
}): JSX.Element => {
    const webcamRef = useRef<Webcam & HTMLVideoElement>(null);
    const [scannerOn, setScannerOn] = useState<boolean>(true);
    const [scanTimer, setScanTimer] = useState<NodeJS.Timer>();

    const codeReader = new BrowserMultiFormatReader();

    const capture = useCallback(() => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        if (imageSrc) {
            codeReader
                .decodeFromImage(undefined, imageSrc)
                .then((result) => {
                    setScannerOn(false);
                    onScanResult({
                        text: result.getText(),
                        format: result.getBarcodeFormat(),
                    });
                })
                .catch((err) => {
                    console.error("decode image failed");
                });
        }
    }, [codeReader, onScanResult]);

    useEffect(() => {
        const cleanup = () => {
            if (scanTimer) clearInterval(scanTimer);
        };
        cleanup();
        if (scannerOn) {
            const timer = setInterval(capture, 100);
            setScanTimer(timer);
        }
        return cleanup;
    }, [scannerOn]);

    return (
        <>
            <Box
                sx={{
                    marginTop: "2em",
                    border: "5px solid #e2e2e2",
                    padding: "1em",
                }}
            >
                <Webcam
                    width={width}
                    height={height}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    videoConstraints={{
                        facingMode: "environment",
                    }}
                />
            </Box>
        </>
    );
};
