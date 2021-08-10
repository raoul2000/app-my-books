import React, { useCallback, useRef, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
    BarcodeFormat,
    BrowserMultiFormatReader,
    Result,
} from "@zxing/library";
import Webcam from "react-webcam";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        webcamContainer: {
            marginTop:'2em',
            border: "5px solid black"
        }
    })
);

export type BarcodeResult = {
    text: string;
    format: BarcodeFormat;
};

type Props = {
    width?: string | number;
    height?: string | number;
    onUpdate: (arg0: unknown, arg1?: BarcodeResult) => void;
};

export const CodeBarScanner: React.FC<Props> = ({
    width,
    height,
    onUpdate,
}): JSX.Element => {
    const classes = useStyles();
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
                    onUpdate(null, {
                        text: result.getText(),
                        format: result.getBarcodeFormat(),
                    });
                })
                .catch((err) => {
                    console.error("decode image failed");
                    onUpdate(err);
                });
        }
    }, [codeReader, onUpdate]);

    React.useEffect(() => {
        const cleanup = () => {
            if (scanTimer) 
                clearInterval(scanTimer);
        };
        cleanup();
        if (scannerOn) {
            const timer = setInterval(capture, 300);
            setScanTimer(timer);
        }
        return cleanup;
    }, [scannerOn]);

    return (
        <div className={classes.webcamContainer}>
            <Webcam
                width={width}
                height={height}
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={{
                    facingMode: "environment",
                }}
            />
            <div>
                <button onClick={() => setScannerOn(!scannerOn)}>
                    {scannerOn ? "stop scan" : "start scan"}
                </button>
            </div>
        </div>
    );
};
