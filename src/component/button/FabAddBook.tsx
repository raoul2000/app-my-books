import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";

type Props = {
    onClick: () => void;
};

export const FabAddBook: React.FC<Props> = ({ onClick }): JSX.Element => {
    return (
        <Fab
            sx={{
                position: "fixed",
                bottom: "1em",
                right: "1em",
                backgroundColor: green[600],
                "&:hover": {
                    backgroundColor: green[800],
                },
            }}
            color="primary"
            aria-label="add"
            onClick={onClick}
        >
            <AddIcon />
        </Fab>
    );
};
