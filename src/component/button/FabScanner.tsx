import React from "react";
import Fab from "@mui/material/Fab";
import CropFreeIcon from "@mui/icons-material/CropFree";

type Props = {
    onClick: () => void;
};

export const FabScanner: React.FC<Props> = ({ onClick }): JSX.Element => {
    return (
        <Fab
            sx={{ position: "fixed", bottom: "1em", right: "1em" }}
            aria-label="scan"
            onClick={onClick}
        >
            <CropFreeIcon />
        </Fab>
    );
};
