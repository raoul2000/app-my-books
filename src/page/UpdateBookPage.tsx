import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useLocation from "wouter/use-location";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

import { FormBook } from "@/component/form/FormBook";
import { bookListState, bookByIdState } from "@/state/book-list";
import { Book, createBookFormState, BookResult } from "@/types";
import BookApi from "@/api/book";
import { progressState } from "@/state/progress";
import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { bookFormState } from "@/state/book-form";
import { IsbnScanner } from "@/component/IsbnScanner";
import { FabScanner } from "@/component/button/FabScanner";
import { useSnackbar } from "notistack";

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

export const UpdateBookPage: React.FC<Props> = ({ id }): JSX.Element | null => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [enableIsbnScan, setEnableIsbnScan] = useState(false);

    const setBooks = useSetRecoilState<Book[]>(bookListState);
    const thisBook = useRecoilValue(bookByIdState(id));

    const [bookForm, setBookForm] = useRecoilState(bookFormState);
    const setProgress = useSetRecoilState(progressState);
    const [, setLocation] = useLocation();

    if (!thisBook) {
        setLocation("/");
        return null;
    }

    useEffect(() => setBookForm(createBookFormState(thisBook)), []);

    const handleSave = () => {
        if (!bookForm.title) {
            alert("please enter a title");
            setBookForm((curState) => ({
                ...curState,
                validation: {
                    ...curState.validation,
                    title: false,
                },
            }));
            return;
        }
        setProgress(true);
        BookApi.updateBook({
            ...thisBook,
            title: bookForm.title,
            subtitle: bookForm.subtitle,
            author: bookForm.author,
            isbn: bookForm.isbn,
            readStatus: bookForm.readStatus,
            rate: bookForm.rate,
        })
            .then((updatedBook) => {
                setBooks((oldBooks) => [
                    ...oldBooks.map((oBook) => {
                        if (oBook.id === updatedBook.id) {
                            return {
                                ...updatedBook,
                                ticket: oBook.ticket,
                                isTicketLoaded: oBook.isTicketLoaded,
                                tracks: oBook.tracks,
                            };
                        } else {
                            return { ...oBook };
                        }
                    }),
                ]);
            })
            .catch(console.error)
            .finally(() => setProgress(false));

        setLocation(`/detail/${id}`);
    };

    const searchBookByIsbn = (isbn: string) => {
        setBookForm((old) => ({ ...old, isbnSearch: "progress" }));

        return BookApi.searchBookByISBN(isbn)
            .then((bookData: BookResult) => {
                setBookForm((old) => ({ ...old, isbnSearch: "success" }));
                setBookForm((curState) => ({
                    ...curState,
                    ...bookData,
                    isbn,
                }));
            })
            .catch((error) => {
                enqueueSnackbar("ISBN introuvable", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                });
                setBookForm((old) => ({ ...old, isbnSearch: "error" }));
            });
    };

    const handleIsbnScanSuccess = (isbn: string) => {
        setEnableIsbnScan(false);
        setBookForm((old) => ({ ...old, isbn }));
        searchBookByIsbn(isbn);
    };

    const handleIsbnSearch = () => {
        if (bookForm?.isbn) {
            searchBookByIsbn(bookForm.isbn);
        }
    };

    return (
        <>
            {enableIsbnScan === true ? (
                <IsbnScanner
                    onSuccess={handleIsbnScanSuccess}
                    onError={console.log}
                    onCancel={() => setEnableIsbnScan(false)}
                />
            ) : (
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
                            <FormBook onIsbnSearch={handleIsbnSearch} />
                        </Container>
                    </main>
                    <FabScanner onClick={() => setEnableIsbnScan(true)} />
                </div>
            )}
        </>
    );
};
