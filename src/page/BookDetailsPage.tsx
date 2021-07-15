import React from "react";
import { Link } from "wouter";
import { useRecoilValue } from "recoil";
import { booksState } from "../state/books";
import { Book } from "../types";
type Props = {
    id: string;
};

export const BookDetailsPage: React.FC<Props> = ({ id }): JSX.Element => {
    const books = useRecoilValue<Book[]>(booksState);
    const thisBook = books.find((book) => book.id === id);

    return (
        <div className="detail-book">
            <Link href="/" className="active">
                &lt; home
            </Link>
            {thisBook && (
                <ul>
                    <li>ID : {thisBook.id}</li>
                    <li>Title : {thisBook.title}</li>
                    <li>Author : {thisBook.author}</li>
                </ul>
            )}
        </div>
    );
};
