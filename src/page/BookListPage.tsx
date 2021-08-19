import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { TopBar } from "@/component/TopBar";

import { useRecoilState } from "recoil";
import { useLocation } from "wouter";

import { ListBooks } from "../component/ListBooks";
import { bookListState } from "../state/book-list";
import { loadingBooksState } from "../state/loading-books";
import BookApi from "../api/book";
import { FabAddBook } from "@/component/button/FabAddBook";

export const BookListPage: React.FC<{}> = (): JSX.Element => {
    const [books, setBooks] = useRecoilState(bookListState);
    const [loadingBooks, setLoadingBooks] = useRecoilState(loadingBooksState);
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (loadingBooks.status === "init") {
            setLoadingBooks({ status: "loading", errorMessage: "" });
            BookApi.readAllBooks()
                .then(setBooks)
                .catch(() =>
                    setLoadingBooks({
                        status: "error",
                        errorMessage: "failed to load book list",
                    })
                )
                .finally(() =>
                    setLoadingBooks({ status: "success", errorMessage: "" })
                );
        }
    }, []);

    return (
        <div>
            <TopBar />
            <main>
                <Container maxWidth="sm">
                    {loadingBooks.status === "error" && (
                        <div>Failed to load book list</div>
                    )}
                    <ListBooks
                        books={books}
                        loading={loadingBooks.status === "loading"}
                    />
                    <FabAddBook onClick={() => setLocation("/add")} />
                </Container>
            </main>
        </div>
    );
};
