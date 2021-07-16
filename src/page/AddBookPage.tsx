import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";

import { Link, useLocation } from "wouter";
import { useSetRecoilState } from "recoil";
import { booksState } from "../state/books";
import { Book } from "../types";
import { FormBook } from "../component/FormBook";
import BookApi from "../api/book";

export const AddBookPage: React.FC<{}> = (): JSX.Element => {
    const setBooks = useSetRecoilState<Book[]>(booksState);

    const [, setLocation] = useLocation();

    const addBook = (book: Book) => {
        BookApi.addBook(book)
            .then((newBook) => {
                console.log(newBook);
                setBooks((oldBooks) => [newBook, ...oldBooks]);
                setLocation("/");
            })
            .catch((error) => console.error(error));
    };
    const goHome = () => setLocation("/");

    return (
        <div className="add-book">
            <IconButton
                aria-label="back"
                size="small"
                onClick={() => setLocation("/")}
            >
                <ArrowBackIosIcon fontSize="small" /> Book list
            </IconButton>
            <Typography variant="h5" component="h1">
                Add book
            </Typography>
            <FormBook onSubmit={addBook} onCancel={goHome} />
        </div>
    );
};
