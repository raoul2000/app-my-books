import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";

import Storage from "@/utils/storage";

type Props = {
    onSubmit: () => void;
};

export const FormSettings: React.FC<Props> = ({ onSubmit }): JSX.Element => {
    const [apiKey, setApiKey] = useState<string>("");

    useEffect(() => {
        const persistentApiKey = window.localStorage.getItem("api-key");
        setApiKey(persistentApiKey || "");
    }, []);

    const handleSubmit = () => {
        Storage.setApiKey(apiKey);
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
