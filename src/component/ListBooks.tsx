import React from "react";
import { Book } from "../types";
import { useLocation } from "wouter";
import { booksState } from "../state/books";
import { useSetRecoilState } from "recoil";
import BookApi from "../api/book";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ButtonGroup from "@material-ui/core/ButtonGroup";

type Props = {
    books: Book[];
};

export const ListBooks: React.FC<Props> = ({ books }): JSX.Element => {
    const [, setLocation] = useLocation();
    const setBooks = useSetRecoilState<Book[]>(booksState);

    const handleDeleteBook = (book: Book): void => {
        if (confirm(`Delete "${book.title}" ?`)) {
            BookApi.deleteBookById(book.id)
                .then(() => {
                    setBooks((oldBooks) => [
                        ...oldBooks.filter((obook) => obook.id !== book.id),
                    ]);
                })
                .catch(console.error);
        }
    };
    const listBook = () => {
        return (
            <ListItem>
                <ListItemText
                    primary="Single-line item"
                    secondary="Secondary text"
                />
            </ListItem>
        );
    };
    return (
        <div className="list-books">
            <List>
                {books.length ? (
                    books.map((book) => (
                        <ListItem>
                            <ListItemText
                                primary={book.title}
                                secondary={book.author}
                                onClick={() =>
                                    setLocation(`/detail/${book.id}`)
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <EditIcon
                                        onClick={() =>
                                            setLocation(`/update/${book.id}`)
                                        }
                                    />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon
                                        onClick={() => handleDeleteBook(book)}
                                    />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                ) : (
                    <div>no book</div>
                )}
            </List>
        </div>
    );
};
