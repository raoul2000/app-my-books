import React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { makeStyles, Theme, createStyles } from "@mui/styles";
import { useLocation } from "wouter";

import { Book } from "@/types";
import { ListBookItem } from "./ListBookItem";
import { ListBookItemSkeleton } from "./ListBookItemSkeleton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
    })
);

type Props = {
    books: Book[];
    loading: boolean;
};

export const ListBooks: React.FC<Props> = ({ books, loading }): JSX.Element => {
    const classes = useStyles();
    const [, setLocation] = useLocation();

    const handleShowBookDetail = (bookId: string) =>
        setLocation(`/detail/${bookId}`);

    const renderBookList = (booksToRender: Book[]) => (
        <List className={classes.root}>
            {loading ? (
                <ListBookItemSkeleton />
            ) : (
                booksToRender.map((book) => (
                    <ListBookItem
                        key={book.id}
                        book={book}
                        onSelectBook={handleShowBookDetail}
                    />
                ))
            )}
        </List>
    );

    return (
        <>
            {loading || books.length ? (
                renderBookList(books)
            ) : (
                <Typography
                    variant="h5"
                    component="h1"
                    align="center"
                    color="textSecondary"
                >
                    Votre bibliothèque est vide
                </Typography>
            )}
        </>
    );
};
