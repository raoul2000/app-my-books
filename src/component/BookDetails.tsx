import React from "react";
import { Book } from "../types";

type Props = {
    book: Book;
    onHide: () => void
};

export const BookDetails: React.FC<Props> = ({ book, onHide}): JSX.Element => {
    return (
        <div className="detail-book">
            <ul>
                <li>ID : {book.id}</li>
                <li>Title : {book.title}</li>
                <li>Author : {book.author}</li>
            </ul>
            <button onClick={onHide}>close</button>
        </div>
    );
};
