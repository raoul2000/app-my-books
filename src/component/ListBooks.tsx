import React from "react";
import { Book } from "../types";
import { useLocation } from "wouter";
import { booksState } from "../state/books";
import { useSetRecoilState } from "recoil";

type Props = {
    books: Book[];
};

export const ListBooks: React.FC<Props> = ({
    books
}): JSX.Element => {
    const [, setLocation] = useLocation();
    const setBooks = useSetRecoilState<Book[]>(booksState);
    
    const handleDeleteBook = (book:Book):void => {
        if(confirm(`Delete "${book.title}" ?`)) {
            fetch(`http://localhost:3001/books/${book.id}`, {
                method: 'DELETE'
            }).then( () => {
                setBooks((oldBooks) => [ ...oldBooks.filter((obook) => obook.id !== book.id)]);
            }).catch(console.error);
        }
    };

    return (
        <div className="list-books">
            {books.length ? (
                books.map((book) => (
                    <div key={book.id} className="item-book">
                        <div className="info">
                            <div className="title">{book.title}</div>
                            <div className="author">{book.author} {book.id}</div>
                        </div>
                        <div className="actions">
                            <button onClick={() => setLocation(`/detail/${book.id}`)}>
                                info
                            </button>
                            <button onClick={() => handleDeleteBook(book)}>
                                Delete
                            </button>
                            <button onClick={() =>  setLocation(`/update/${book.id}`)}>
                                Update
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>no book</p>
            )}
        </div>
    );
};


