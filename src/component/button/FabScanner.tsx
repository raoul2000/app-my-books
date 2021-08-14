import React from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import CropFreeIcon from "@material-ui/icons/CropFree";

type Props = {
    onClick: () => void;
};

const useStyles = makeStyles((theme) => ({
    fabQuickLogin: {
        position: "fixed",
        bottom: "1em",
        right: "1em",
    },
}));

export const FabScanner: React.FC<Props> = ({ onClick }): JSX.Element => {
    const classes = useStyles();

    return (
        <Fab
            color="primary"
            aria-label="scan"
            className={classes.fabQuickLogin}
            onClick={onClick}
        >
            <CropFreeIcon />
        </Fab>
    );
};
