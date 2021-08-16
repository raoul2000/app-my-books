import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";
import { AsyncOperationStatus } from "../types";

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
    onChange: (v: string) => void;
    onStartSearch: () => void;
};
export const IsbnSearchField: React.FC<Props> = ({
    value,
    status,
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
                    return <CheckIcon />;
            }
        };
        return (
            <IconButton
                aria-label="search by ISBN"
                onClick={onStartSearch}
                disabled={status === "progress"}
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
            disabled={status === "progress"}
        />
    );
};
