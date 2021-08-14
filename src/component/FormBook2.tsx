import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from '@material-ui/icons/Error';
import { useRecoilState } from "recoil";

import { Book, BookFormState } from "../types";
import { bookFormState } from "../state/book-form";
import { FormBook } from "./FormBook";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spinnerButton: {
            width: "10px",
        },
    })
);

type Props = {
    onIsbnSearch: () => void;
};
export const FormBook2: React.FC<Props> = ({ onIsbnSearch }): JSX.Element => {
    const classes = useStyles();
    const [bookForm, setBookFormState] =
        useRecoilState<BookFormState>(bookFormState);
    const [isbnSearchState, setIsbnSearchState] = useState<
        "progress" | "success" | "error"
    >("success");

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

    const renderIsbnSearchButton = () => {
        const renderButtonContent = () => {
            switch (bookForm.isbnSearch) {
                case 'progress':
                    return <CircularProgress className={classes.spinnerButton} />;
                case 'error':
                    return <ErrorIcon/>
                default:
                    return  <CheckIcon/>;
            }
        } 
        return (
            <IconButton
                aria-label="search by ISBN"
                onClick={onIsbnSearch}
                onMouseDown={console.log}
            >
                {renderButtonContent()}
            </IconButton>
        );
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
                                        {renderIsbnSearchButton()}
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            error={bookForm.isbnSearch === 'error'}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
// 
