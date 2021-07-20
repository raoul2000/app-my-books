import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";
import { Book } from "../types";

type Props = {
    book?: Book;
    onSubmit: (book: Book) => void;
    onCancel: () => void;
};

export const FormBook: React.FC<Props> = ({
    onSubmit,
    onCancel,
    book,
}): JSX.Element => {
    const [bookTitle, setBookTitle] = useState<string>(book?.title || "");
    const [bookAuthor, setBookAuthor] = useState<string>(book?.author || "");

    const handleSubmit = () => {
        if (!bookTitle) {
            alert("enter book title");
        } else {
            onSubmit({
                id: book ? book.id : "" + Math.random(),
                title: bookTitle,
                author: bookAuthor,
            });
        }
    };

    return (
        <div className="form-book">
            <form autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="book-title"
                            label="Title"
                            value={bookTitle}
                            onChange={(e) => setBookTitle(e.target.value)}
                            required
                            fullWidth
                            variant="filled"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="book-author"
                            label="Author"
                            value={bookAuthor}
                            onChange={(e) => setBookAuthor(e.target.value)}
                            fullWidth
                            variant="filled"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            color="primary"
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
