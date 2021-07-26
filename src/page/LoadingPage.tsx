import React from 'react';
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        progressColor: {
            color: "white",
        },
    })
);


export const LoadingPage: React.FC<{}> = ():JSX.Element => {
    const classes = useStyles();
    return ( 
        <div className="loading-list">
            <Typography variant="h5" component="h1">
                About
            </Typography>
            <CircularProgress className={classes.progressColor}/>
        </div>
    );
}