import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import Input from "@material-ui/core/Input";
import CheckIcon from "@material-ui/icons/Check";

import { useRecoilState } from "recoil";

import { Book, BookFormState } from "../types";
import { bookFormState } from "../state/book-form";
import { FabScanner } from "./button/FabScanner";
import { IsbnScanner } from "./IsbnScanner";

type Props = {
    book?: Book;
};

export const FormBook: React.FC<Props> = ({ book }): JSX.Element => {
    const [enableIsbnScan, setEnableIsbnScan] = useState(false);
    const [bookForm, setBookFormState] =
        useRecoilState<BookFormState>(bookFormState);

    useEffect(() => {
        if (book) {
            setBookFormState({
                title: book.title,
                author: book.author,
                validation: {
                    title: true,
                },
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
        <>
            {enableIsbnScan === true ? (
                <IsbnScanner
                    onSuccess={console.log}
                    onError={console.log}
                    onCancel={() => setEnableIsbnScan(false)}
                />
            ) : (
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
                                <FabScanner onClick={() => setEnableIsbnScan(true)} />
                            </Grid>
                        </Grid>
                    </form>
                </div>
            )}
        </>
    );
};
