import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useLocation } from "wouter";
import { Book } from "@/types";
import { ListBookItem } from "./ListBookItem";
import { ListBookItemSkeleton } from "./ListBookItemSkeleton";

type Props = {
    books: Book[];
    loading: boolean;
};

export const ListBooks: React.FC<Props> = ({ books, loading }): JSX.Element => {
    const [, setLocation] = useLocation();
    const handleShowBookDetail = (bookId: string) =>
        setLocation(`/detail/${bookId}`);

    const renderBookList = (booksToRender: Book[]) => (
        <Box sx={{ bgcolor: "background.paper" }}>
            <List>
                {loading ? (
                    <ListBookItemSkeleton />
                ) : (
                    booksToRender.map((book) => (
                        <ListBookItem
                            key={book.id}
                            book={book}
                            onSelectBook={handleShowBookDetail}
                        />
                    ))
                )}
            </List>
        </Box>
    );

    return (
        <>
            {loading || books.length ? (
                renderBookList(books)
            ) : (
                <Typography
                    variant="h5"
                    component="h1"
                    align="center"
                    color="textSecondary"
                >
                    Votre bibliothèque est vide
                </Typography>
            )}
        </>
    );
};
