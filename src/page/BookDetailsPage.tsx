import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

import { useRecoilState, useSetRecoilState } from "recoil";
import { booksState } from "../state/books";
import { progressState } from "../state/progress";
import { Book } from "../types";
import { useLocation } from "wouter";
import BookApi from "../api/book";
import { TopBarActions } from "@/component/TopBarActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flex: 1,
            justifyContent: "flex-end",
            color: "white",
            textAlign: "center",
        },
        submitButton: {
            color: "white",
        },
    })
);

type Props = {
    id: string;
};

export const BookDetailsPage: React.FC<Props> = ({ id }): JSX.Element => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [books, setBooks] = useRecoilState<Book[]>(booksState);
    const setProgress = useSetRecoilState(progressState);
    const [, setLocation] = useLocation();

    const thisBook = books.find((book) => book.id === id);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleDeleteBook = (book?: Book): void => {
        if (!book) return;

        if (confirm(`Delete "${book.title}" ?`)) {
            setProgress(true);
            setLocation("/");
            BookApi.deleteBookById(book.id)
                .then(() => {
                    setBooks((oldBooks) => [
                        ...oldBooks.filter((obook) => obook.id !== book.id),
                    ]);
                })
                .catch(console.error)
                .finally(() => setProgress(false));
        }
        handleClose();
    };

    return (
        <>
            <TopBarActions
                actions={
                    <>
                        <Button
                            className={classes.submitButton}
                            onClick={() => setLocation(`/update/${id}`)}
                        >
                            Modifier
                        </Button>
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
                            <MenuItem
                                onClick={() => handleDeleteBook(thisBook)}
                            >
                                Supprimer
                            </MenuItem>
                        </Menu>
                    </>
                }
            ></TopBarActions>
            <main>
                <Container maxWidth="sm">
                    <div className="detail-book">
                        {thisBook && (
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {thisBook.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {thisBook.author}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        isbn : {thisBook.isbn || ''}
                                    </Typography>                                    
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </Container>
            </main>
        </>
    );
};
