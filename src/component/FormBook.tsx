import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";
import { Book, BookFormState } from "../types";
import { bookFormState } from "../state/book-form";
import { useResetRecoilState, useRecoilState } from "recoil";
import { useEffect } from "react";

type Props = {
    book?: Book;
};

export const FormBook: React.FC<Props> = ({
    book,
}): JSX.Element => {
    const [bookForm, setBookFormState] =
        useRecoilState<BookFormState>(bookFormState);

    useEffect(() => {
        if (book) {
            setBookFormState({
                title: book.title,
                author: book.author,
                onSubmit: () => {},
            });
        }
    }, []);

    const handleBookTitleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setBookFormState((state) => ({
            ...state,
            title: e.target.value,
        }));
    };

    const handleBookAuthorChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setBookFormState((state) => ({
            ...state,
            author: e.target.value,
        }));
    };

    return (
        <div className="form-book">
            <form autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="book-title"
                            label="Title"
                            value={bookForm.title || ""}
                            onChange={handleBookTitleChange}
                            required
                            fullWidth
                            variant="filled"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="book-author"
                            label="Author"
                            value={bookForm.author || ""}
                            onChange={handleBookAuthorChange}
                            fullWidth
                            variant="filled"
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
