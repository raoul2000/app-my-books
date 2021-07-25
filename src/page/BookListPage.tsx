import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";

import { useRecoilValue } from "recoil";
import { ListBooks } from "../component/ListBooks";
import { booksState } from "../state/books";
import { Book } from "../types";
import { useLocation } from "wouter";
import { Header } from "@/component/Header";


export const BookListPage: React.FC<{}> = (): JSX.Element => {
    const books = useRecoilValue<Book[]>(booksState);
    const [, setLocation] = useLocation();
    return (
        <div className="about">
            <Header />
            <main>
                <Container maxWidth="sm">
                    <ListBooks books={books} />
                    <Fab
                        color="primary"
                        aria-label="add"
                        className="btn-add-book"
                        onClick={() => setLocation("/add")}
                    >
                        <AddIcon />
                    </Fab>
                </Container>
            </main>
        </div>
    );
};
