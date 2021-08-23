import React from 'react';
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

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
            <div>{message || "opération en cours ..."}</div>
        </Typography>
        <Typography align="center">
            <CircularProgress />
        </Typography>
    </>
    );
}