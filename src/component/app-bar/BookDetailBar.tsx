import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

import { Book } from "../../types";
import { useLocation } from "wouter";
import { TopBarActions } from "@/component/app-bar/TopBarActions";

type Props = {
    book: Book;
    onClickDeleteBook: (book: Book) => void;
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        updateButton: {
            color: "white",
        },
    })
);

export const BookDetailBar: React.FC<Props> = ({
    book,
    onClickDeleteBook,
}): JSX.Element => {
    const classes = useStyles();
    const [, setLocation] = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
        setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);

    return (
        <TopBarActions
            actions={
                <>
                    <Button
                        className={classes.updateButton}
                        onClick={() => setLocation(`/update/${book.id}`)}
                    >
                        Modifier
                    </Button>
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
                        <MenuItem onClick={() => onClickDeleteBook(book)}>
                            Supprimer
                        </MenuItem>
                    </Menu>
                </>
            }
        ></TopBarActions>
    );
};
