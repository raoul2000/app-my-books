import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import MainMenu from "../MainMenu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { progressState } from "../../state/progress";
import { useRecoilValue } from "recoil";
import { useLocation } from "wouter";

type Props = {
    enableFilter: boolean;
    onShowFilterClick: () => void;
};

export const BookListBar: React.FC<Props> = ({
    enableFilter,
    onShowFilterClick,
}): JSX.Element => {
    const progress = useRecoilValue<boolean>(progressState);
    const [, setLocation] = useLocation();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <div onClick={() => setLocation("/")}>My Books</div>
                </Typography>
                {enableFilter && (
                    <IconButton
                        sx={{ color: "white" }}
                        onClick={() => onShowFilterClick()}
                    >
                        <FilterAltIcon />
                    </IconButton>
                )}
                {progress && <CircularProgress sx={{ color: "white" }} />}
                <MainMenu />
            </Toolbar>
        </AppBar>
    );
};
