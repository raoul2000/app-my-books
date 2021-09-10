import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useRecoilState } from "recoil";
import { useLocation } from "wouter";
import { useSnackbar } from "notistack";

import { BookListBar } from "@/component/app-bar/BookListBar";
import { ListBooks } from "../component/ListBooks";
import { bookListState } from "../state/book-list";
import { loadingBooksState } from "../state/loading-books";
import BookApi from "../api/book";
import { FabAddBook } from "@/component/button/FabAddBook";

export const BookListPage: React.FC<{}> = (): JSX.Element => {
    const { enqueueSnackbar } = useSnackbar();
    const [books, setBooks] = useRecoilState(bookListState);
    const [loadingBooks, setLoadingBooks] = useRecoilState(loadingBooksState);
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (loadingBooks.status === "init") {
            setLoadingBooks({ status: "loading", errorMessage: "" });
            BookApi.readAllBooks()
                .then(setBooks)
                .catch(() => {
                    enqueueSnackbar("Erreur lors du chargement de la liste des livres", {
                        variant: "error",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                        },
                    });
                    setLoadingBooks({
                        status: "error",
                        errorMessage: "failed to load book list",
                    });
                })
                .finally(() =>
                    setLoadingBooks({ status: "success", errorMessage: "" })
                );
        }
    }, []);

    return (
        <div>
            <BookListBar />
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
