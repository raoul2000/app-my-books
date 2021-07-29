import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";

import { useRecoilState } from "recoil";
import { useLocation } from "wouter";

import { ListBooks } from "../component/ListBooks";
import { booksState } from "../state/books";
import { loadingBooksState } from "../state/loading-books";
import { TopBar } from "@/component/TopBar";
import BookApi from "../api/book";

export const BookListPage: React.FC<{}> = (): JSX.Element => {
    const [books, setBooks] = useRecoilState(booksState);
    const [loadingBooks, setLoadingBooks] = useRecoilState(loadingBooksState);
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (loadingBooks.status === "init") {
            setLoadingBooks({ status: "loading", errorMessage: "" });
            BookApi.getAllBooks()
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
                    <>
                        <ListBooks
                            books={books}
                            loading={loadingBooks.status === "loading"}
                        />
                        <Fab
                            color="primary"
                            aria-label="add"
                            className="btn-add-book"
                            onClick={() => setLocation("/add")}
                        >
                            <AddIcon />
                        </Fab>
                    </>
                </Container>
            </main>
        </div>
    );
};
