import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useRecoilState } from "recoil";

import { BookFormState } from "../types";
import { bookFormState } from "../state/book-form";
import { IsbnSearchField } from "./IsbnSearchField";

type Props = {
    onIsbnSearch: () => void;
};
export const FormBook2: React.FC<Props> = ({ onIsbnSearch }): JSX.Element => {
  
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

    const handleBookIsbnChange = (isbn: string) => {
        setBookFormState((state) => ({
            ...state,
            isbn,
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
                            disabled={bookForm.isbnSearch === "progress"}
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
                            disabled={bookForm.isbnSearch === "progress"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <IsbnSearchField
                            value={bookForm.isbn || ""}
                            status={bookForm.isbnSearch}
                            onChange={handleBookIsbnChange}
                            onStartSearch={onIsbnSearch}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
//
