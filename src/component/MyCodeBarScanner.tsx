import React, { useCallback, useRef, useState } from "react";
import {
    BarcodeFormat,
    BrowserMultiFormatReader,
    Result,
} from "@zxing/library";
import Webcam from "react-webcam";

type BarcodeResult = {
    text: string;
    format: BarcodeFormat;
};
type Props = {
    width: number;
    height: number;
    onUpdate: (arg0: unknown, arg1?: Result) => void;
};
export const MyCodeBarScanner: React.FC<Props> = ({
    width,
    height,
    onUpdate,
}): JSX.Element => {
    const webcamRef = useRef<Webcam & HTMLVideoElement>(null);
    const [data, setData] = useState<BarcodeResult | undefined>();
    const [scannerOn, setScannerOn] = useState<boolean>(true);
    const [scanTimer, setScanTimer] = useState<NodeJS.Timer>();
    const codeReader = new BrowserMultiFormatReader();

    const capture = useCallback(() => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        if (imageSrc) {
            codeReader
                .decodeFromImage(undefined, imageSrc)
                .then((result) => {
                    console.log(result);
                    setData({
                        text: result.getText(),
                        format: result.getBarcodeFormat(),
                    });
                    setScannerOn(false);
                    onUpdate(null, result);
                })
                .catch((err) => {
                    console.error("decode image failed");
                    onUpdate(err);
                });
        }
    }, [codeReader, onUpdate]);

    React.useEffect(() => {
        if (scanTimer) {
            clearInterval(scanTimer);
        }
        if (scannerOn) {
            const timer = setInterval(capture, 300);
            setScanTimer(timer);
        }
    }, [scannerOn]);

    return (
        <div className="video-container">
            {data ? (
                <div>
                    <ul>
                        <li>text : {data.text}</li>
                        <li>format: {data.format}</li>
                    </ul>
                    <button onClick={() => setScannerOn(true)}>
                        restart scan
                    </button>
                </div>
            ) : (
                <div>
                    nothing ...
                    <button onClick={() => setScannerOn(!scannerOn)}>
                        {scannerOn ? "stop scan" : "start scan"}
                    </button>
                </div>
            )}

            <hr />
            <div className="inner-container">
                <div className="video-overlay">
                    <button onClick={() => setScannerOn(true)}>
                        restart scan
                    </button>
                </div>
                <Webcam
                    width="100%"
                    height="100%"
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    videoConstraints={{
                        facingMode: "environment",
                    }}
                />
            </div>
        </div>
    );
};
