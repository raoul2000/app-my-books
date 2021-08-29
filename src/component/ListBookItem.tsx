import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import BookIcon from "@material-ui/icons/Book";

import { Book } from "@/types";

type Props = {
    book: Book;
    onSelectBook: (bookId: string) => void;
};
export const ListBookItem: React.FC<Props> = ({
    book,
    onSelectBook,
}): JSX.Element => {
    return (
        <ListItem
            key={book.id}
            divider={false}
            button
            onClick={() => onSelectBook(book.id)}
        >
            <ListItemAvatar>
                <Avatar>
                    <BookIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={book.title} secondary={book.author} />
        </ListItem>
    );
};
