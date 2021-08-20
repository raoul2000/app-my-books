import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import BookIcon from '@material-ui/icons/Book';

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { useLocation } from "wouter";

import { Book } from "../types";

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

    // TODO: update skeleton to render avatar
    const renderBookList = (booksToRender: Book[]) => (
        <List className={classes.root}>
            {loading &&
                Array.from(new Array(5)).map((book, index) => (
                    <ListItem key={index} divider={true}>
                        <ListItemText
                            primary={<Skeleton variant="rect" height="1.5em" />}
                            secondary={<Skeleton variant="text" />}
                        />
                    </ListItem>
                ))}
            {!loading &&
                booksToRender.map((book) => (
                    <ListItem
                        key={book.id}
                        divider={false}
                        button
                        onClick={() => handleShowBookDetail(book.id)}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <BookIcon />
                            </Avatar>
                        </ListItemAvatar>
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
            {loading || books.length ? (
                renderBookList(books)
            ) : (
                <Typography
                    variant="h5"
                    component="h1"
                    align="center"
                    color="textSecondary"
                >
                    It seems your book collection is empty
                </Typography>
            )}
        </>
    );
};
