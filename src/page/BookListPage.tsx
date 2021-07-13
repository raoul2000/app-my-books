import React from "react";
import { useRecoilValue } from "recoil";
import { ListBooks } from "../component/ListBooks";
import { Toolbar } from "../component/Toolbar";
import { booksState } from "../state/books";
import { Book } from "../types";

export const BookListPage: React.FC<{}> = (): JSX.Element => {
    const books = useRecoilValue<Book[]>(booksState)
    return (
        <>
            <Toolbar/>
            <ListBooks
                books={books}
            />
        </>
    );
};
