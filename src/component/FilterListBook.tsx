import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bookListFilterState } from "@/state/book-list";
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
        <TextField
            value={localFilterValue}
            fullWidth={true}
            autoFocus={true}
            onChange={updateBookListFilter}
            id="book-filter"
            label="Filtrer par titre ou auteur"
            variant="standard"
            autoComplete="off"
        />
    );
};
