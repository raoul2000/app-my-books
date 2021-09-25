import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import BookIcon from "@mui/icons-material/Book";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { blue } from "@mui/material/colors";

import { Book } from "@/types";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";

type Props = {
    key: string;
    book: Book;
    onSelectBook: (bookId: string) => void;
};

export const ListBookItem: React.FC<Props> = ({
    book,
    onSelectBook,
}): JSX.Element => {
    const classIcon: SxProps<Theme> = book.isTraveling
        ? { backgroundColor: blue[200] }
        : {};
    return (
        <ListItem divider={false} button onClick={() => onSelectBook(book.id)}>
            <ListItemAvatar>
                <Avatar sx={classIcon}>
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
