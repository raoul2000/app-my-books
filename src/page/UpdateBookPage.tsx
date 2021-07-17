import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";

import { useRecoilState } from "recoil";
import { FormBook } from "../component/FormBook";
import { booksState } from "../state/books";
import { Book } from "../types";
import BookApi from "../api/book";
import useLocation from "wouter/use-location";

type Props = {
    id: string;
};

export const UpdateBookPage: React.FC<Props> = ({ id }): JSX.Element => {
    const [books, setBooks] = useRecoilState<Book[]>(booksState);
    const [, setLocation] = useLocation();

    const thisBook = books.find((book) => book.id === id);

    const updateBook = (book: Book) => {
        setLocation("/");
        BookApi.updateBook(book)
            .then(() => {
                setBooks((oldBooks) => [
                    ...oldBooks.map((oBook) => {
                        if (oBook.id === book.id) {
                            return { ...book };
                        } else {
                            return { ...oBook };
                        }
                    }),
                ]);
            })
            .catch(console.error);
    };

    const goHome = () => setLocation("/");
    return (
        <div className="update-book">
            <IconButton
                aria-label="back"
                size="small"
                onClick={() => setLocation("/")}
            >
                <ArrowBackIosIcon fontSize="small" /> Book list
            </IconButton>
            {thisBook ? (
                <>
                    <Typography variant="h5" component="h1">
                        Update book
                    </Typography>
                    <FormBook
                        book={thisBook}
                        onSubmit={updateBook}
                        onCancel={goHome}
                    />
                </>
            ) : (
                <div>Book Not found</div>
            )}
        </div>
    );
};
