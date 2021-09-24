import React from "react";
import Fab from "@mui/material/Fab";
import { makeStyles } from "@mui/styles";
import CropFreeIcon from "@mui/icons-material/CropFree";

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
            aria-label="scan"
            className={classes.fabQuickLogin}
            onClick={onClick}
        >
            <CropFreeIcon />
        </Fab>
    );
};
