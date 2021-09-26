import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "wouter";
import Storage from '../utils/storage';

const MainMenu: React.FC<{}> = (): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [, setLocation] = useLocation();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAbout = () => {
        handleClose();
        setLocation("/about");
    };

    const handleSignOut = () => {
        Storage.clearApiKey();
        setLocation("/signin");
    };
    return (
        <div>
            <IconButton
                aria-label="settings"
                color="inherit"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                <MenuItem onClick={handleAbout}>About</MenuItem>
            </Menu>
        </div>
    );
};
export default MainMenu;
