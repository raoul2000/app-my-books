import React from "react";
import { Book } from "../types";
import { useLocation } from "wouter";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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
