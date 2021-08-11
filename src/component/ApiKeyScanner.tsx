import React, { useState, useEffect } from "react";
import { TopBarSecondary } from "@/component/TopBarSecondary";
import { BarcodeResult, CodeBarScanner } from "@/component/CodeBarScanner";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import BookApi from "@/api/book";

type Props = {
    onSuccess: (apiKey: string) => void;
    onError: () => void;
};

export const ApiKeyScanner: React.FC<Props> = ({
    onSuccess,
    onError,
}): JSX.Element => {
    const [data, setData] = useState<BarcodeResult | undefined>();

    useEffect(() => {
        if (data) {
            // TODO: manage fecth abort on cleanup
            // see https://davidwalsh.name/cancel-fetch
            /* const controller = new AbortController();
                const { signal } = controller; */

            BookApi.checkApiKey(data.text).then((isValid) => {
                //onSuccess(data.text);
                onError();
                /* if (isValid) {
                    onSuccess(data.text);
                } else {
                    onError();
                } */
            });
        }
    }, [data]);

    return (
        <div className="barcode">
            <main>
                <Container maxWidth="sm">
                    {data ? (
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
                        <CodeBarScanner
                            width="100%"
                            onUpdate={(err, result) => {
                                if (result) setData(result);
                                else setData(undefined);
                            }}
                        />
                    )}
                </Container>
            </main>
        </div>
    );
};
