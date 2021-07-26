import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
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

    const handleSettings = () => {
        handleClose();
        setLocation("/settings");
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
