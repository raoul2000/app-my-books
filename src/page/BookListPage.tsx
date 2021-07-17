import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { useRecoilValue } from "recoil";
import { ListBooks } from "../component/ListBooks";
import { booksState } from "../state/books";
import { Book } from "../types";
import { useLocation } from "wouter";

export const BookListPage: React.FC<{}> = (): JSX.Element => {
    const books = useRecoilValue<Book[]>(booksState);
    const [, setLocation] = useLocation();
    return (
        <>
            <ListBooks books={books} />
            <Fab
                color="secondary"
                aria-label="add"
                className="btn-add-book"
                onClick={() => setLocation("/add")}
            >
                <AddIcon />
            </Fab>
        </>
    );
};
