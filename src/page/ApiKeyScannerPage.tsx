import React, { useState } from "react";
import { TopBarSecondary } from "@/component/TopBarSecondary";
import { BarcodeResult, CodeBarScanner } from "@/component/CodeBarScanner";
import Container from "@material-ui/core/Container";


export const ApiKeyScannerPage: React.FC<{}> = (): JSX.Element => {
    const [data, setData] = useState<BarcodeResult|undefined>();

    return (
        <div className="barcode">
            <TopBarSecondary />
            <main>
                <Container maxWidth="sm">
                    <CodeBarScanner
                        width="100%"
                        onUpdate={(err, result) => {
                            if (result) setData(result);
                            else setData(undefined);
                        }}
                    />
                    <p>{data && data.text}</p>
                </Container>
            </main>
        </div>
    );
};
