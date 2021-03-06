import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { useLocation } from "wouter";
import { useSetRecoilState, useRecoilState } from "recoil";
import { bookListState } from "../state/book-list";
import { progressState } from "../state/progress";
import { Book, createBookForm, BookResult } from "../types";
import { FormBook } from "../component/form/FormBook";
import BookApi from "../api/book";
import Container from "@mui/material/Container";
import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { bookFormState } from "@/state/book-form";
import { IsbnScanner } from "@/component/IsbnScanner";
import { FabScanner } from "@/component/button/FabScanner";
import { ConfirmSaveBook } from "@/component/dialog/ConfirmSaveBook";

export const AddBookPage: React.FC<{}> = (): JSX.Element => {
    const { enqueueSnackbar } = useSnackbar();
    const [enableIsbnScan, setEnableIsbnScan] = useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [books, setBooks] = useRecoilState<Book[]>(bookListState);
    const setProgress = useSetRecoilState(progressState);
    const [bookForm, setBookForm] = useRecoilState(bookFormState);
    const [, setLocation] = useLocation();

    useEffect(() => setBookForm(createBookForm()), []);

    const addBook = () => {
        const newBook: Omit<Book, "id"> = {
            title: bookForm.title,
            subtitle: bookForm.subtitle,
            author: bookForm.author,
            isbn: bookForm.isbn,
            readStatus: bookForm.readStatus,
            rate: bookForm.rate,
            isTicketLoaded: false,
            isTraveling: false,
            tracks: [],
            pingCount: 0,
        };

        setProgress(true);
        setLocation("/");
        BookApi.addBook(newBook)
            .then((savedBook) => {
                setBooks((oldBooks) => [savedBook, ...oldBooks]);
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
                (bookForm.isbn && book.isbn === bookForm.isbn) ||
                bookForm.title.toLowerCase() === book.title.toLowerCase()
        );
        if (duplicateBook) {
            setShowConfirm(true);
        } else {
            addBook();
        }
    };

    const searchBookByIsbn = (isbn: string) => {
        setBookForm((old) => ({ ...old, isbnSearch: "progress" }));

        return BookApi.searchBookByISBN(isbn)
            .then((bookData: BookResult) => {
                setBookForm((curState) => ({
                    ...curState,
                    ...bookData,
                    isbn,
                    isbnSearch: "success",
                }));
            })
            .catch((error) => {
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
                        backPath={"/"}
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
                        <FabScanner onClick={() => setEnableIsbnScan(true)} />
                        {showConfirm && (
                            <ConfirmSaveBook
                                onConfirm={addBook}
                                onCancel={() => setShowConfirm(false)}
                            />
                        )}
                    </main>
                </div>
            )}
        </>
    );
};
