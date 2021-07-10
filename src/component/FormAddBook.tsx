import React, { useState } from "react";
import { Book } from "../types";

type Props = {
    onCancel: () => void;
    onSubmit: (newBook: Book) => void;
}

export const FormAddBook: React.FC<Props> = ({onCancel, onSubmit}): JSX.Element => {
    const [bookTitle, setBookTitle] = useState<string>("");
    const [bookAuthor, setBookAuthor] = useState<string>("");

    const handleSubmit = (): void => {
        if(!bookTitle) {
            alert('enter book title');
        } else {
            onSubmit({
                id: ''+Math.random(),
                title: bookTitle,
                author: bookAuthor
            });
            onCancel();
        }
    }
    return (
        <div className="form-add-book">
            <h3>Add book</h3>
            <hr />

            <input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} placeholder="title"/>
            <input type="text" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} placeholder="author"/>

            <button onClick={handleSubmit}>save</button>
            <button onClick={() => onCancel()}>cancel</button>
        </div>
    );
};
