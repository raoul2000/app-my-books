import React from "react";
import { Link, useLocation } from "wouter";
import { useSetRecoilState } from "recoil";
import { booksState } from "../state/books";
import { Book } from "../types";
import { FormBook } from "../component/FormBook";

export const AddBookPage: React.FC<{}> = (): JSX.Element => {
    const setBooks = useSetRecoilState<Book[]>(booksState);

    const [, setLocation] = useLocation();

    const addBook = (book: Book) => {
        setBooks((oldBooks) => [book, ...oldBooks]);
        setLocation("/");
    };
    const goHome = () => setLocation("/");

    return (
        <div className="form-add-book">
            <Link href="/" className="active">
                &lt; home
            </Link>
            <h3>Add book</h3>
            <hr />
            <FormBook onSubmit={addBook} onCancel={goHome} />
        </div>
    );
};
