import React from "react";
import { Link, useLocation } from "wouter";
import { useSetRecoilState } from "recoil";
import { booksState } from "../state/books";
import { Book } from "../types";
import { FormBook } from "../component/FormBook";
import { addBook as saveBook } from "../api/mock"; 

export const AddBookPage: React.FC<{}> = (): JSX.Element => {
    const setBooks = useSetRecoilState<Book[]>(booksState);

    const [, setLocation] = useLocation();

    const addBook = (book: Book) => {
        saveBook(book)
        .then(newBook => {
            setBooks((oldBooks) => [newBook, ...oldBooks]);
            setLocation("/");
        })
        .catch(error => console.error(error));
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
