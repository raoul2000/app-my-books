import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { useRecoilState,  useSetRecoilState } from "recoil";
import { FormBook } from "../component/FormBook";
import { booksState } from "../state/books";
import { Book } from "../types";
import BookApi from "../api/book";
import useLocation from "wouter/use-location";
import { progressState } from "../state/progress";
import Container from "@material-ui/core/Container";
import { TopBarActions } from "@/component/TopBarActions";
import { bookFormState } from "@/state/book-form";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submitButton: {
            color: "white",
        },
    })
);

type Props = {
    id: string;
};

export const UpdateBookPage: React.FC<Props> = ({ id }): JSX.Element => {
    const classes = useStyles();
    const [books, setBooks] = useRecoilState<Book[]>(booksState);
    const [bookForm, setBookForm] = useRecoilState(bookFormState);
    const setProgress = useSetRecoilState(progressState);
    const [, setLocation] = useLocation();

    const thisBook = books.find((book) => book.id === id);

    const handleSave = () => {
        console.log(bookForm);
        if(!thisBook) {
            return;
        }
        if(!bookForm.title) {
            alert('please enter a title');
            setBookForm((curState) => ({
                ...curState,
                validation: {
                    ...curState.validation,
                    title:false
                }
            }));
            return;
        }
        const updatedBook:Book = {
            ...thisBook,
            title: bookForm.title,
            author:bookForm.author
        };
        setProgress(true);
        setLocation(`/detail/${id}`);
        BookApi.updateBook(updatedBook)
            .then(() => {
                setBooks((oldBooks) => [
                    ...oldBooks.map((oBook) => {
                        if (oBook.id === updatedBook.id) {
                            return { ...updatedBook };
                        } else {
                            return { ...oBook };
                        }
                    }),
                ]);
            })
            .catch(console.error)
            .finally(() => setProgress(false));        

    };
    return (
        <div>
            <TopBarActions
                showBack={true}
                backPath={`/detail/${id}`}
                actions={
                    <Button
                        className={classes.submitButton}
                        onClick={handleSave}
                    >
                        Enregistrer
                    </Button>
                }
            />
            <main>
                <Container maxWidth="sm">
                    <div className="update-book">
                        {thisBook ? (
                            <>
                                <Typography variant="h5" component="h1">
                                    Update book
                                </Typography>
                                <FormBook
                                    book={thisBook}
                                />
                            </>
                        ) : (
                            <div>Book Not found</div>
                        )}
                    </div>
                </Container>
            </main>
        </div>
    );
};
