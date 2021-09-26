import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import MainMenu from "../MainMenu";
import CircularProgress from "@mui/material/CircularProgress";
import { progressState } from "../../state/progress";
import { useRecoilValue } from "recoil";
import { useLocation } from "wouter";

export const BookListBar: React.FC<{}> = (): JSX.Element => {
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
                {progress && <CircularProgress sx={{ color: "white" }} />}
                <MainMenu />
            </Toolbar>
        </AppBar>
    );
};
