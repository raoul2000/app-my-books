import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useRecoilState } from "recoil";
import { useLocation } from "wouter";
import { useSnackbar } from "notistack";

import { BookListBar } from "@/component/app-bar/BookListBar";
import { ListBooks } from "../component/ListBooks";
import { bookListState } from "../state/book-list";
import { loadingBooksState } from "../state/loading-books";
import BookApi from "../api/book";
import { FabAddBook } from "@/component/button/FabAddBook";
import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';

export const BookListPage: React.FC<{}> = (): JSX.Element => {
    const { enqueueSnackbar } = useSnackbar();
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [books, setBooks] = useRecoilState(bookListState);
    const [loadingBooks, setLoadingBooks] = useRecoilState(loadingBooksState);
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (loadingBooks.status === "init") {
            setLoadingBooks({ status: "loading", errorMessage: "" });
            BookApi.readAllBooks()
                .then(setBooks)
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

    const toggleFilter = () => setShowFilter(!showFilter);

    return (
        <div>
            <BookListBar 
                enableFilter={true}
                onShowFilterClick={toggleFilter}
            />
            <main>
                <Container maxWidth="sm">
                    {loadingBooks.status === "error" && (
                        <div>Failed to load book list</div>
                    )}
                    {showFilter &&
                        <Box className="scale-in-ver-top">
                                <TextField 
                                    fullWidth={true}
                                    autoFocus={true}
                                id="book-filter" label="Filtrer" variant="outlined" />
                        </Box>
                    }
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
