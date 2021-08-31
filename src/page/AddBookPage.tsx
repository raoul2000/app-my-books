import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useLocation } from "wouter";
import { useSetRecoilState, useRecoilState } from "recoil";
import { bookListState } from "../state/book-list";
import { progressState } from "../state/progress";
import { Book, createBookForm } from "../types";
import { FormBook } from "../component/form/FormBook";
import BookApi from "../api/book";
import Container from "@material-ui/core/Container";
import { TopBarActions } from "@/component/TopBarActions";
import { bookFormState } from "@/state/book-form";
import { IsbnScanner } from "@/component/IsbnScanner";
import { FabScanner } from "@/component/button/FabScanner";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submitButton: {
            color: "white",
        },
    })
);

export const AddBookPage: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const [enableIsbnScan, setEnableIsbnScan] = useState(false);
    const setBooks = useSetRecoilState<Book[]>(bookListState);
    const setProgress = useSetRecoilState(progressState);
    const [bookForm, setBookForm] = useRecoilState(bookFormState);
    const [, setLocation] = useLocation();

    useEffect(() => setBookForm(createBookForm()), []);

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
            pingCount:0
        };

        setProgress(true);
        setLocation("/");
        BookApi.addBook(newBook)
            .then((savedBook) => {
                setBooks((oldBooks) => [savedBook, ...oldBooks]);
            })
            .catch((error) => console.error(error))
            .finally(() => setProgress(false));
    };

    const searchBookByIsbn = (isbn: string) => {
        setBookForm((old) => ({ ...old, isbnSearch: "progress" }));

        return BookApi.searchBookByISBN(isbn)
            .then((bookData: Book) => {
                //                setBookForm((old) => ({ ...old, isbnSearch: "success" }));
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
                        <FabScanner onClick={() => setEnableIsbnScan(true)} />
                    </main>
                </div>
            )}
        </>
    );
};
