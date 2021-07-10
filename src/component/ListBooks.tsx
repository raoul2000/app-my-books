import React from "react";
import { Book } from "../types";

type Props = {
    books: Book[];
    onViewBookDetails: (book: Book) => void;
    onDeleteBookById: (bookId: string) => void;
    onUpdateBookById: (bookId: string) => void;
};

export const ListBooks: React.FC<Props> = ({
    books,
    onViewBookDetails,
    onDeleteBookById,
    onUpdateBookById,
}): JSX.Element => {
    return (
        <div className="list-books">
            {books.length ? (
                books.map((book) => (
                    <div key={book.id} className="item-book">
                        <div className="info">
                            <div className="title">{book.title}</div>
                            <div className="author">{book.author}</div>
                        </div>
                        <div className="actions">
                            <button onClick={() => onViewBookDetails(book)}>
                                info
                            </button>
                            <button onClick={() => onDeleteBookById(book.id)}>
                                Delete
                            </button>
                            <button onClick={() => onUpdateBookById(book.id)}>
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
