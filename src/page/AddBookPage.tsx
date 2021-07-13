import React, { useState } from "react";
import { Link, useLocation } from "wouter";

export const AddBookPage: React.FC<{}> = (): JSX.Element => {
    const [bookTitle, setBookTitle] = useState<string>("");
    const [bookAuthor, setBookAuthor] = useState<string>("");
    const [, setLocation] = useLocation();

    const handleSubmit = (): void => {
        if (!bookTitle) {
            alert("enter book title");
        } else {
            console.log("add", {
                id: "" + Math.random(),
                title: bookTitle,
                author: bookAuthor,
            });
            setLocation("/");
        }
    };
    return (
        <div className="form-add-book">
            <Link href="/" className="active">
                &lt; home
            </Link>
            <h3>Add book</h3>
            <hr />

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
        </div>
    );
};
