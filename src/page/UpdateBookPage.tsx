import React from "react";
import { useRecoilState } from "recoil";
import { Link, useLocation } from "wouter";
import { FormBook } from "../component/FormBook";
import { booksState } from "../state/books";
import { Book } from "../types";
import { updateBook as saveBook } from "../api/mock";
type Props = {
    id: string;
};

export const UpdateBookPage: React.FC<Props> = ({ id }): JSX.Element => {
    const [books, setBooks] = useRecoilState<Book[]>(booksState);
    const [, setLocation] = useLocation();

    const thisBook = books.find((book) => book.id == id);

    const updateBook = (book: Book) => {
        saveBook(book)
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
                setLocation("/");
            })
            .catch(console.error);
    };

    const goHome = () => setLocation("/");
    return (
        <div className="form-add-book">
            <Link href="/" className="active">
                &lt; home
            </Link>
            {thisBook ? (
                <>
                    <h3>Update book</h3>
                    <hr />
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
