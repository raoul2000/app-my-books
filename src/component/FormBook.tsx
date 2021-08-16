import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';

import { useRecoilState } from "recoil";

import { BookFormState } from "../types";
import { bookFormState } from "../state/book-form";
import { IsbnSearchField } from "./IsbnSearchField";

type Props = {
    onIsbnSearch: () => void;
};
export const FormBook: React.FC<Props> = ({ onIsbnSearch }): JSX.Element => {
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

    const handleReadStatusChange = (
        readStatus:number
    ) => {
        setBookFormState((state) => ({
            ...state,
            readStatus,
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
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Read status
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bookForm.readStatus || ''}
                                onChange={(e) => handleReadStatusChange(e.target.value as unknown as number)}
                            >
                                <MenuItem><em>None</em></MenuItem>
                                <MenuItem value={1}>To Read</MenuItem>
                                <MenuItem value={2}>Read</MenuItem>
                                <MenuItem value={3}>Reading</MenuItem>
                            </Select>
                            <FormHelperText>Some important helper text</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
//
