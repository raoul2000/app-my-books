import React from "react";
import Fab from "@mui/material/Fab";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { green } from '@mui/material/colors';

type Props = {
    onClick: () => void;
};

const useStyles = makeStyles((theme) => ({
    fabAddBook: {
        position: "fixed",
        bottom: "1em",
        right: "1em",
        backgroundColor: green[700],
        "&:hover" : {
            backgroundColor: green[900]
        }
    },
}));

export const FabAddBook: React.FC<Props> = ({ onClick }): JSX.Element => {
    const classes = useStyles();
    return (
        <Fab
            color="primary"
            aria-label="add"
            className={classes.fabAddBook}
            onClick={onClick}
        >
            <AddIcon />
        </Fab>
    );
};
