import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Rating from "@material-ui/lab/Rating";

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

    const handleBookSubtitleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setBookFormState((state) => ({
            ...state,
            subtitle: e.target.value,
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

    const handleReadStatusChange = (readStatus: number) => {
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

    const handleRateChange = (rate: number | null) => {
        setBookFormState((state) => ({
            ...state,
            rate: rate || undefined
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
                            multiline={true}
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
                            id="book-subtitle"
                            label="Sub Title"
                            multiline={true}
                            value={bookForm.subtitle || ""}
                            onChange={handleBookSubtitleChange}
                            fullWidth
                            disabled={bookForm.isbnSearch === "progress"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="book-author"
                            label="Author"
                            multiline={true}
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
                        <Rating
                            name="book-rate"
                            value={bookForm.rate || null}
                            onChange={(event, newValue) => {
                                handleRateChange(newValue);
                            }}
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
                                value={bookForm.readStatus || ""}
                                onChange={(e) =>
                                    handleReadStatusChange(
                                        e.target.value as unknown as number
                                    )
                                }
                            >
                                <MenuItem>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>To Read</MenuItem>
                                <MenuItem value={2}>Read</MenuItem>
                                <MenuItem value={3}>Reading</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
//
