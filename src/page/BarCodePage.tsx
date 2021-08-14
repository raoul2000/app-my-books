import React, { useState, useEffect, useRef } from "react";
import {
    BrowserMultiFormatOneDReader,
    // BrowserMultiFormatReader,
    IScannerControls,
} from "@zxing/browser";

// this component is not used - just here for example

const getQRCodeReaderControls = async (selectedDeviceId: string) => {
    const codeReader = new BrowserMultiFormatOneDReader();

    const previewElem = document.querySelector("video");
    const videoElem = previewElem as HTMLVideoElement;

    // you can use the controls to stop() the scan or switchTorch() if available

    // decodeOnceFromVideoDevice
    const controls = await codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        videoElem,
        (result, error, controls) => {
            // use the result and error values to choose your actions
            // you can also use controls API in this scope like the controls
            // returned from the method.
            console.log("---- result: ", result);
            console.log("---- error: ", error);
            console.log("---- controls: ", controls);

            if (result) {
                alert(JSON.stringify(result));
            }
        }
    );

    return controls;
};

const getQRCodeReaderControls2 = async (imgUrl: any) => {
    const codeReader = new BrowserMultiFormatOneDReader();
    try {
        const result = await codeReader.decodeFromImageUrl(imgUrl);
        console.log(result);

        if (result) {
            alert(JSON.stringify(result));
        }
    } catch (err) {
        console.error(err);
    }
};

type Device = {
    deviceId: string;
    label: string;
};

export const BarCodePage: React.FC = () => {
    const controlsRef = useRef<IScannerControls | null>(null);
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [devices, setDevices] = useState<Array<Device>>([]);
    const [file, setFile] = useState<string | undefined>();

    const handleChange = (event: any) => {
        setFile(URL.createObjectURL(event.target.files[0]));
    };

    useEffect(() => {
        const getDevices = async () => {
            const videoInputDevices =
                await BrowserMultiFormatOneDReader.listVideoInputDevices();

            // choose your media device (webcam, frontal camera, back camera, etc.)
            const selectedDeviceId = videoInputDevices[0].deviceId;

            console.log(
                `Started decode from camera with id ${selectedDeviceId}`
            );

            setDevices(videoInputDevices);
            setSelectedDeviceId(selectedDeviceId);
        };

        getDevices();
    }, []);

    return (
        <div>
            <div id="sourceSelectPanel">
                <label htmlFor="sourceSelect">Select the camera:</label>
                <select
                    id="sourceSelect"
                    value={selectedDeviceId}
                    onChange={(event) =>
                        setSelectedDeviceId(event.target.value)
                    }
                >
                    {devices.map(({ deviceId, label }) => (
                        <option key={deviceId} value={deviceId}>
                            {label}
                        </option>
                    ))}
                </select>
                <br></br>
                (if you change the selected camera, please click again the Start
                button)
            </div>
            <button
                onClick={async () => {
                    controlsRef.current = await getQRCodeReaderControls(
                        selectedDeviceId
                    );
                }}
            >
                Start
            </button>
            <button
                onClick={() => {
                    controlsRef.current?.stop();
                }}
            >
                Stop
            </button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <label htmlFor="avatar">Upload a barcode image:</label>
            <div>
                <input type="file" onChange={handleChange} />
                <img src={file} alt="Barcode to scan" />
            </div>
            <button
                onClick={async () => {
                    await getQRCodeReaderControls2(file);
                }}
            >
                Scan from image
            </button>
        </div>
    );
};
