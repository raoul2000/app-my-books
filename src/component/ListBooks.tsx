import React, { useRef } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useLocation } from "wouter";
import { Book } from "@/types";
import { ListBookItem } from "./ListBookItem";
import { ListBookItemSkeleton } from "./ListBookItemSkeleton";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
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
                    data={books}
                    ref={virtuoso}
                    itemContent={(index) => (
                        <ListBookItem
                            key={books[index].id}
                            book={books[index]}
                            onSelectBook={handleShowBookDetail}
                        />
                    )}
                    components={{
                        Footer: () => {
                            return (
                                <div
                                    style={{
                                        padding: "2rem",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <button
                                        disabled={loading}
                                        onClick={() => console.log('loading more ...')}
                                    >
                                        {loading
                                            ? "Loading..."
                                            : "Press to load more"}
                                    </button>
                                </div>
                            );
                        },
                    }}
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
