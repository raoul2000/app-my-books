import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { bookListFilterState } from "@/state/book-list";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

export const FilterListBook: React.FC<{}> = (): JSX.Element => {
    const [localFilterValue, setLocalFilterValue] = useState<string>("");

    const [bookListFilter, setBookListFilter] =
        useRecoilState(bookListFilterState);

    useEffect(() => {
        if (bookListFilter.input !== localFilterValue) {
            setLocalFilterValue(bookListFilter.input);
        }
    }, []);
    
    const updateBookListFilter = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const filterValue = e.target.value;
        setLocalFilterValue(filterValue);

        if (filterValue.length > 2) {
            setBookListFilter((curVal) => ({
                ...curVal,
                input: filterValue,
            }));
        } else if (
            filterValue.length <= 2 &&
            bookListFilter.input.length !== 0
        ) {
            setBookListFilter((curVal) => ({
                ...curVal,
                input: "",
            }));
        }
    };

    return (
        <Box className="scale-in-ver-top">
            <TextField
                value={localFilterValue}
                fullWidth={true}
                autoFocus={bookListFilter.input.length !== 0}
                onChange={updateBookListFilter}
                id="book-filter"
                label="Filtrer par titre ou auteur"
                variant="outlined"
                autoComplete="off"
            />
        </Box>
    );
};
