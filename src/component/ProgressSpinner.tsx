import React from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

type Props = {
    message?: string;
};

export const ProgressSpinner: React.FC<Props> = ({ message }): JSX.Element => {
    return (
        <>
            <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                gutterBottom={true}
            >
                {message || "opération en cours ..."}
            </Typography>
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        </>
    );
};
