import React, { useRef } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useLocation } from "wouter";
import { Book } from "@/types";
import { ListBookItem } from "./ListBookItem";
import { ListBookItemSkeleton } from "./ListBookItemSkeleton";
import { Virtuoso } from "react-virtuoso";

type Props = {
    books: Book[];
    loading: boolean;
};

export const ListBooks: React.FC<Props> = ({ books, loading }): JSX.Element => {
    const [, setLocation] = useLocation();
    const virtuoso = useRef(null);
    const handleShowBookDetail = (bookId: string) =>
        setLocation(`/detail/${bookId}`);

    const renderBookList = (booksToRender: Book[]) => (
        <Box sx={{ bgcolor: "background.paper" }} className="book-list">
            {loading ? (
                <List>
                    <ListBookItemSkeleton />
                </List>
            ) : (
                <Virtuoso
                    useWindowScroll
                    data={booksToRender}
                    ref={virtuoso}
                    itemContent={(index) => (
                        <ListBookItem
                            book={booksToRender[index]}
                            onSelectBook={handleShowBookDetail}
                        />
                    )}
                />
            )}
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
                    Aucune livre trouvé
                </Typography>
            )}
        </>
    );
};
