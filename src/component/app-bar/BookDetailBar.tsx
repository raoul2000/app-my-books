import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

import { Book } from "../../types";
import { useLocation } from "wouter";
import { TopBarActions } from "@/component/app-bar/TopBarActions";

type Props = {
    book: Book;
    onClickDeleteBook: (book: Book) => void;
};

export const BookDetailBar: React.FC<Props> = ({
    book,
    onClickDeleteBook,
}): JSX.Element => {
    const [, setLocation] = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
        setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);
    const handleClickDelete = () => {
        if (!book.isTraveling) {
            onClickDeleteBook(book);
        }
    };
    return (
        <TopBarActions
            actions={
                <>
                    <Button
                        sx={{ color: "white" }}
                        onClick={() => setLocation(`/update/${book.id}`)}
                    >
                        Modifier
                    </Button>

                    {book.isTraveling === false && (
                        <>
                            <IconButton
                                aria-label="settings"
                                color="inherit"
                                onClick={handleOpenMenu}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem
                                    onClick={() => onClickDeleteBook(book)}
                                >
                                    Supprimer
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </>
            }
        ></TopBarActions>
    );
};
