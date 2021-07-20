import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";
import { useEffect } from "react";

type Props = {
    onSubmit: () => void;
};

export const FormSettings: React.FC<Props> = ({ onSubmit }): JSX.Element => {
    const [apiKey, setApiKey] = useState<string>("");

    useEffect(() => {
        const persistentApiKey = window.localStorage.getItem('api-key');
        setApiKey(persistentApiKey || '');
    }, []);

    const handleSubmit = () => {
        window.localStorage.setItem('api-key',apiKey);
        onSubmit();
    };

    return (
        <div className="form-settings">
            <form autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="api-key"
                            label="API Key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            required
                            fullWidth
                            variant="filled"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            color="primary"
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
