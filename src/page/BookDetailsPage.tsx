import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { useRecoilState, useSetRecoilState } from "recoil";
import { booksState } from "../state/books";
import { progressState } from "../state/progress";
import { Book } from "../types";
import { useLocation } from "wouter";
import BookApi from "../api/book";
import { TopBarSecondary } from "@/component/TopBarSecondary";
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
        backButton: {
            marginRight: theme.spacing(2),
        },
    })
);

type Props = {
    id: string;
};

export const BookDetailsPage: React.FC<Props> = ({ id }): JSX.Element => {
    const classes = useStyles();
    const [books, setBooks] = useRecoilState<Book[]>(booksState);
    const setProgress = useSetRecoilState(progressState);
    const [, setLocation] = useLocation();

    const thisBook = books.find((book) => book.id === id);

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
    };

    return (
        <div className="about">
            <TopBarActions
                actions={
                    <>
                        <Button
                            className={classes.submitButton}
                            onClick={() => setLocation(`/update/${id}`)}
                        >
                            Modifier
                        </Button>
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
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <Fab
                        color="secondary"
                        aria-label="delete book"
                        className="btn-delete-book"
                        onClick={() => handleDeleteBook(thisBook)}
                    >
                        <DeleteIcon />
                    </Fab>
                </Container>
            </main>
        </div>
    );
};
