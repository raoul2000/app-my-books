import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useLocation from "wouter/use-location";

import { useRecoilState, useSetRecoilState } from "recoil";
import { FormBook } from "../component/form/FormBook";
import { bookListState } from "../state/book-list";
import { Book } from "../types";
import BookApi from "../api/book";
import { progressState } from "../state/progress";
import { TopBarActions } from "@/component/app-bar/TopBarActions";
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

type Props = {
    id: string;
};

export const UpdateBookPage: React.FC<Props> = ({ id }): JSX.Element => {
    const classes = useStyles();
    const [enableIsbnScan, setEnableIsbnScan] = useState(false);
    const [books, setBooks] = useRecoilState<Book[]>(bookListState);
    const [bookForm, setBookForm] = useRecoilState(bookFormState);
    const setProgress = useSetRecoilState(progressState);
    const [, setLocation] = useLocation();

    useEffect(() => {
        const thisBook = books.find((book) => book.id === id);
        setBookForm({
            title: thisBook?.title || "",
            subtitle: thisBook?.subtitle || "",
            author: thisBook?.author || "",
            isbn: thisBook?.isbn || "",
            readStatus: thisBook?.readStatus || undefined,
            rate: thisBook?.rate,
            validation: {
                title: true,
            },
            isbnSearch: "success",
        });
    }, []);

    const handleSave = () => {
        console.log(bookForm);

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
        const updatedBook: Book = {
            id,
            title: bookForm.title,
            subtitle: bookForm.subtitle,
            author: bookForm.author,
            isbn: bookForm.isbn,
            readStatus: bookForm.readStatus,
            rate: bookForm.rate,
            isTicketLoaded:false,
            isTraveling: false,
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

    const searchBookByIsbn = (isbn: string) => {
        setBookForm((old) => ({ ...old, isbnSearch: "progress" }));

        return BookApi.searchBookByISBN(isbn)
            .then((bookData: Book) => {
                setBookForm((old) => ({ ...old, isbnSearch: "success" }));
                setBookForm((curState) => ({
                    ...curState,
                    ...bookData,
                    isbn,
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
    console.log(bookForm);
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
