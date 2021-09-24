import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import BookIcon from "@mui/icons-material/Book";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@mui/styles";
import { blue } from "@mui/material/colors";

import { Book } from "@/types";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        traveling: {
            backgroundColor: blue[200],
        },
    })
);

type Props = {
    key: string;
    book: Book;
    onSelectBook: (bookId: string) => void;
};

export const ListBookItem: React.FC<Props> = ({
    book,
    onSelectBook,
}): JSX.Element => {
    const classes = useStyles();
    return (
        <ListItem divider={false} button onClick={() => onSelectBook(book.id)}>
            <ListItemAvatar>
                <Avatar className={clsx({[classes.traveling] : book.isTraveling === true})}>
                    {book.isTraveling === true ? (
                        <FlightTakeoffIcon />
                    ) : (
                        <BookIcon />
                    )}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={book.title} secondary={book.author} />
        </ListItem>
    );
};
