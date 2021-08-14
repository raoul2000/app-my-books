import React from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

type Props = {
    onClick: () => void;
};

const useStyles = makeStyles((theme) => ({
    fabAddBook: {
        position: "fixed",
        bottom: "1em",
        right: "1em",
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
