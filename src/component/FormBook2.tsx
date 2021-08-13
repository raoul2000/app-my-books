import React, {  useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import CheckIcon from "@material-ui/icons/Check";

import { useRecoilState } from "recoil";

import { Book, BookFormState } from "../types";
import { bookFormState } from "../state/book-form";

export const FormBook2: React.FC<{}> = (): JSX.Element => {
    const [bookForm, setBookFormState] =
        useRecoilState<BookFormState>(bookFormState);

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

    const handleBookIsbnChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setBookFormState((state) => ({
            ...state,
            isbn: e.target.value,
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
                    <Grid item xs={12}>
                        <TextField
                            label="ISBN"
                            id="book-isbn"
                            fullWidth
                            value={bookForm.isbn || ""}
                            onChange={handleBookIsbnChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={console.log}
                                            onMouseDown={console.log}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
