import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import BookIcon from "@material-ui/icons/Book";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

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
