import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Alert } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Rating from "@material-ui/lab/Rating";
import { useRecoilState } from "recoil";

import { BookFormState, getReadStatusLabel } from "@/types";
import { bookFormState } from "@/state/book-form";
import { IsbnSearchField } from "@/component/IsbnSearchField";

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
            rate: rate || undefined,
        }));
    };

    return (
        <div className="form-book">
            {bookForm.isTraveling && (
                <Box marginBottom="2em">
                    <Alert severity="info">
                        Ce livre voyage, modification limitée
                    </Alert>
                </Box>
            )}
            <form autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="book-title"
                            label="Titre"
                            multiline={true}
                            value={bookForm.title || ""}
                            onChange={handleBookTitleChange}
                            required
                            fullWidth
                            error={!bookForm.validation?.title || false}
                            disabled={
                                bookForm.isbnSearch === "progress" ||
                                bookForm.isTraveling
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="book-subtitle"
                            label="Sous Titre"
                            multiline={true}
                            value={bookForm.subtitle || ""}
                            onChange={handleBookSubtitleChange}
                            fullWidth
                            disabled={
                                bookForm.isbnSearch === "progress" ||
                                bookForm.isTraveling
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="book-author"
                            label="Auteur"
                            multiline={true}
                            value={bookForm.author || ""}
                            onChange={handleBookAuthorChange}
                            fullWidth
                            disabled={
                                bookForm.isbnSearch === "progress" ||
                                bookForm.isTraveling
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <IsbnSearchField
                            value={bookForm.isbn || ""}
                            status={bookForm.isbnSearch}
                            onChange={handleBookIsbnChange}
                            onStartSearch={onIsbnSearch}
                            disabled={
                                bookForm.isbnSearch === "progress" ||
                                bookForm.isTraveling
                            }
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
                                Status de Lecture
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
                                    <em>{getReadStatusLabel()}</em>
                                </MenuItem>
                                <MenuItem value={1}>
                                    {getReadStatusLabel(1)}
                                </MenuItem>
                                <MenuItem value={2}>
                                    {getReadStatusLabel(2)}
                                </MenuItem>
                                <MenuItem value={3}>
                                    {getReadStatusLabel(3)}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
//
