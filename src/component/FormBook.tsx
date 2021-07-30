import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useRecoilState } from "recoil";

import { Book, BookFormState } from "../types";
import { bookFormState } from "../state/book-form";

type Props = {
    book?: Book;
};

export const FormBook: React.FC<Props> = ({ book }): JSX.Element => {
    const [bookForm, setBookFormState] =
        useRecoilState<BookFormState>(bookFormState);

    useEffect(() => {
        if (book) {
            setBookFormState({
                title: book.title,
                author: book.author,
                validation: {
                    title: true,
                }
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
                            error={!bookForm.validation?.title || false}
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
