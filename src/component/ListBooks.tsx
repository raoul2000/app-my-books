import React from "react";
import { Book } from "../types";
import { useLocation } from "wouter";

type Props = {
    books: Book[];
};

export const ListBooks: React.FC<Props> = ({
    books
}): JSX.Element => {
    const [location, setLocation] = useLocation();
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
                            <button onClick={() => setLocation(`/detail/${book.id}`)}>
                                info
                            </button>
                            <button onClick={() => console.log('delete')}>
                                Delete
                            </button>
                            <button onClick={() => console.log('update')}>
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
