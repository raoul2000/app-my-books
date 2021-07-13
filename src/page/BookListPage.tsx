import React, { useState } from "react";
import { booksData } from "../bookData";
import { ListBooks } from "../component/ListBooks";
import { Toolbar } from "../component/Toolbar";
import { Book } from "../types";

export const BookListPage: React.FC<{}> = (): JSX.Element => {
    const [listOfBooks, setListOfBooks] = useState<Book[]>(booksData);

    return (
        <>
            <Toolbar/>
            <ListBooks
                books={listOfBooks}
            />
        </>
    );
};
