import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from '@mui/material/Alert';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Rating from "@mui/material/Rating";
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
                            variant="standard"
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
                            variant="standard"
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
                            variant="standard"
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
                            size="large"
                            value={bookForm.rate || null}
                            onChange={(event, newValue) => {
                                handleRateChange(newValue);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Status de Lecture
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bookForm.readStatus}
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
                                <MenuItem value={4}>
                                    {getReadStatusLabel(4)}
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
