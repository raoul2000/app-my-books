import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useLocation } from "wouter";
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
import { ConfirmSaveBook } from "@/component/dialog/ConfirmSaveBook";

type Props = {
    id: string;
};

export const UpdateBookPage: React.FC<Props> = ({ id }): JSX.Element | null => {
    const { enqueueSnackbar } = useSnackbar();
    const [enableIsbnScan, setEnableIsbnScan] = useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const [books, setBooks] = useRecoilState<Book[]>(bookListState);
    const thisBook = useRecoilValue(bookByIdState(id));

    const [bookForm, setBookForm] = useRecoilState(bookFormState);
    const setProgress = useSetRecoilState(progressState);
    const [, setLocation] = useLocation();

    if (!thisBook) {
        setLocation("/");
        return null;
    }

    useEffect(() => setBookForm(createBookFormState(thisBook)), []);

    const updateBook = () => {
        setProgress(true);
        setLocation(`/detail/${id}`);

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
            .catch((error) => {
                console.error(error);
                if (error.status === 401) {
                    enqueueSnackbar(
                        "Echec lors de l'identification: veuillez vous authentifier",
                        {
                            variant: "error",
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "center",
                            },
                        }
                    );
                    setLocation("/signin");
                }
            })
            .finally(() => setProgress(false));
    };

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
        const duplicateBook = books.find(
            (book) =>
                thisBook.id !== book.id &&
                ((bookForm.isbn && book.isbn === bookForm.isbn) ||
                    bookForm.title.toLowerCase() === book.title.toLowerCase())
        );
        if (duplicateBook) {
            setShowConfirm(true);
        } else {
            updateBook();
        }
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
                                sx={{ color: "white" }}
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
                    {showConfirm && (
                        <ConfirmSaveBook
                            onConfirm={updateBook}
                            onCancel={() => setShowConfirm(false)}
                        />
                    )}
                </div>
            )}
        </>
    );
};
