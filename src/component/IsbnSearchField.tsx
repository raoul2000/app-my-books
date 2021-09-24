import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { createStyles, makeStyles, Theme } from "@mui/styles";
import ErrorIcon from "@mui/icons-material/Error";
import SearchIcon from '@mui/icons-material/Search';

import { AsyncOperationStatus } from "@/types";
import { SyncDisabledTwoTone } from "@mui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spinnerButton: {
            width: "10px",
        },
    })
);

type Props = {
    value: string;
    status: AsyncOperationStatus;
    disabled: boolean;
    onChange: (v: string) => void;
    onStartSearch: () => void;
};
export const IsbnSearchField: React.FC<Props> = ({
    value,
    status,
    disabled,
    onChange,
    onStartSearch
}): JSX.Element => {
    const classes = useStyles();

    const renderIsbnSearchButton = () => {
        const renderButtonContent = () => {
            switch (status) {
                case "progress":
                    return <CircularProgress className={classes.spinnerButton} />;
                case "error":
                    return <ErrorIcon />;
                default:
                    return <SearchIcon />;
            }
        };
        return (
            <IconButton
                aria-label="search by ISBN"
                onClick={onStartSearch}
                disabled={disabled}
            >
                {renderButtonContent()}
            </IconButton>
        );
    };

    return (
        <TextField
            label="ISBN"
            id="book-isbn"
            type="number"
            fullWidth
            value={value}
            onChange={(e) => onChange(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" disablePointerEvents={!value?.length}>
                        {renderIsbnSearchButton()}
                    </InputAdornment>
                ),
            }}
            variant="outlined"
            disabled={disabled}
        />
    );
};
