import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "wouter";
import { useSnackbar } from "notistack";

import { BookListBar } from "@/component/app-bar/BookListBar";
import { ListBooks } from "@/component/ListBooks";
import {
    bookListState,
    filteredBookListState,
    bookListFilterState,
} from "@/state/book-list";
import { loadingBooksState } from "@/state/loading-books";
import BookApi from "@/api/book";
import { FabAddBook } from "@/component/button/FabAddBook";

export const BookListPage: React.FC<{}> = (): JSX.Element => {
    const { enqueueSnackbar } = useSnackbar();
    const [bookListFilter, setBookListFilter] =
        useRecoilState(bookListFilterState);
    const setBookList = useSetRecoilState(bookListState);
    const filteredBookList = useRecoilValue(filteredBookListState);

    const [loadingBooks, setLoadingBooks] = useRecoilState(loadingBooksState);
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (loadingBooks.status === "init") {
            setLoadingBooks({ status: "loading", errorMessage: "" });
            BookApi.readAllBooks()
                .then(setBookList)
                .catch((error) => {
                    console.log(error);
                    if (error.status === 401) {
                        enqueueSnackbar(
                            "Echec lors de l'identification: veuillez vous authentifier",
                            {
                                variant: "error",
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "center",
                                },
                            }
                        );
                        setLocation("/signin");
                    } else {
                        enqueueSnackbar(
                            "Erreur lors du chargement de la liste des livres",
                            {
                                variant: "error",
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "center",
                                },
                            }
                        );
                        setLoadingBooks({
                            status: "error",
                            errorMessage: "failed to load book list",
                        });
                    }
                })
                .finally(() =>
                    setLoadingBooks({ status: "success", errorMessage: "" })
                );
        }
    }, []);

    const toggleFilter = () =>
        setBookListFilter({
            input: "",
            visible: !bookListFilter.visible,
        });

    return (
        <div>
            <BookListBar
                enableFilter={true}
                filterVisible={bookListFilter.visible}
                onShowFilterClick={toggleFilter}
            />
            <main>
                <Container maxWidth="sm">
                    {loadingBooks.status === "error" && (
                        <div>Failed to load book list</div>
                    )}
                    <ListBooks
                        books={filteredBookList}
                        loading={loadingBooks.status === "loading"}
                    />
                    <FabAddBook onClick={() => setLocation("/add")} />
                </Container>
            </main>
        </div>
    );
};
