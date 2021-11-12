import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import MainMenu from "../MainMenu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { progressState } from "../../state/progress";
import { useRecoilValue } from "recoil";
import { useLocation } from "wouter";
import { FilterListBook } from "@/component/FilterListBook";

type Props = {
    enableFilter: boolean;
    filterVisible: boolean;
    onShowFilterClick: () => void;
};

export const BookListBar: React.FC<Props> = ({
    enableFilter,
    filterVisible,
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
                    <div onClick={() => setLocation("/")}>Mes Livres</div>
                </Typography>
                {progress && <CircularProgress sx={{ color: "white" }} />}
                {enableFilter && (
                    <IconButton
                        sx={{ color: "white" }}
                        onClick={() => onShowFilterClick()}
                    >
                        {filterVisible ? (
                            <FilterAltIcon />
                        ) : (
                            <FilterAltOutlinedIcon />
                        )}
                    </IconButton>
                )}
                <MainMenu />
            </Toolbar>
            {filterVisible && (
                <Toolbar sx={{ backgroundColor: "white", padding: "1em" }}>
                    <FilterListBook />
                </Toolbar>
            )}
        </AppBar>
    );
};
