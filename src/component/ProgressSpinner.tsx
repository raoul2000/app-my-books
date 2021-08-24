import React from 'react';
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from '@material-ui/core';

type Props = {
    message?:string
};

export const ProgressSpinner: React.FC<Props> = ({message}):JSX.Element => {
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
}