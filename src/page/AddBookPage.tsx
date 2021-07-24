import React from "react";
import Typography from "@material-ui/core/Typography";

import { useLocation } from "wouter";
import { useSetRecoilState } from "recoil";
import { booksState } from "../state/books";
import { progressState } from "../state/progress";
import { Book } from "../types";
import { FormBook } from "../component/FormBook";
import BookApi from "../api/book";

export const AddBookPage: React.FC<{}> = (): JSX.Element => {
    const setBooks = useSetRecoilState<Book[]>(booksState);
    const setProgress = useSetRecoilState(progressState);
    const [, setLocation] = useLocation();

    const addBook = (book: Book) => {
        setProgress(true);
        setLocation("/");
        BookApi.addBook(book)
            .then((newBook) => {
                console.log(newBook);
                setBooks((oldBooks) => [newBook, ...oldBooks]);
            })
            .catch((error) => console.error(error))
            .finally(() => setProgress(false));
    };
    const goHome = () => setLocation("/");

    return (
        <div className="add-book">
            <Typography variant="h5" component="h1">
                Add book
            </Typography>
            <FormBook onSubmit={addBook} onCancel={goHome} />
        </div>
    );
};
