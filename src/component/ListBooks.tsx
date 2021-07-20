import React from "react";
import { Book } from "../types";
import { useLocation } from "wouter";
import { booksState } from "../state/books";
import { useSetRecoilState } from "recoil";
import BookApi from "../api/book";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { progressState } from "../state/progress";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
    })
);

type Props = {
    books: Book[];
};

export const ListBooks: React.FC<Props> = ({ books }): JSX.Element => {
    const classes = useStyles();
    const [, setLocation] = useLocation();
    const setBooks = useSetRecoilState<Book[]>(booksState);
    const setProgress = useSetRecoilState(progressState);

    const handleDeleteBook = (book: Book): void => {
        if (confirm(`Delete "${book.title}" ?`)) {
            setProgress(true);
            BookApi.deleteBookById(book.id)
                .then(() => {
                    setBooks((oldBooks) => [
                        ...oldBooks.filter((obook) => obook.id !== book.id),
                    ]);
                })
                .catch(console.error)
                .finally(() => setProgress(false));
        }
    };

    const handleShowBookDetail = (bookId: string) =>
        setLocation(`/detail/${bookId}`);

    const renderBookList = (booksToRender: Book[]) => (
        <List className={classes.root}>
            {booksToRender.map((book) => (
                <ListItem
                    key={book.id}
                    button
                    onClick={() => handleShowBookDetail(book.id)}
                >
                    <ListItemText
                        primary={book.title}
                        secondary={book.author}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => setLocation(`/update/${book.id}`)}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteBook(book)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );

    return (
        <>
            {books.length ? (
                renderBookList(books)
            ) : (
                <Typography variant="h5" component="h1" align="center" color="textSecondary">
                    It seems your book collection is empty
                </Typography>
            )}
        </>
    );
};
