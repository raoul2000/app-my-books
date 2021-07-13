import React, { useState } from "react";
import { Book } from "../types";

type Props = {
    book?: Book;
    onSubmit: (book: Book) => void;
    onCancel: () => void;
};

export const FormBook: React.FC<Props> = ({
    onSubmit,
    onCancel,
    book,
}): JSX.Element => {
    const [bookTitle, setBookTitle] = useState<string>(book?.title || "");
    const [bookAuthor, setBookAuthor] = useState<string>(book?.author || "");

    const handleSubmit = () => {
        if (!bookTitle) {
            alert("enter book title");
        } else {
            onSubmit({
                id: book ? book.id : "" + Math.random(),
                title: bookTitle,
                author: bookAuthor,
            });
        }
    };

    return (
        <div className="form-add-book">
            <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="title"
            />
            <input
                type="text"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
                placeholder="author"
            />

            <button onClick={handleSubmit}>save</button>
            <button onClick={() => onCancel()}>Cancel</button>
        </div>
    );
};
