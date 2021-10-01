import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useLocation } from "wouter";
import { Book } from "@/types";
import { ListBookItem } from "./ListBookItem";
import { ListBookItemSkeleton } from "./ListBookItemSkeleton";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";

type Props = {
    books: Book[];
    loading: boolean;
};
const renderRow =
    (books: Book[], handleShowBookDetail: (bookId: string) => void) =>
    (props: ListChildComponentProps) => {
        const { index, style } = props;
        const book = books[index];

        return (
            <div key={book.id} style={style}>
            <ListBookItem
                key={book.id}
                book={book}
                onSelectBook={handleShowBookDetail}
            />
            </div>
        );
    };
export const ListBooks: React.FC<Props> = ({ books, loading }): JSX.Element => {
    const [, setLocation] = useLocation();
    const handleShowBookDetail = (bookId: string) =>
        setLocation(`/detail/${bookId}`);

    const renderBookList = (booksToRender: Book[]) => (
        <Box sx={{ bgcolor: "background.paper" }} className="book-list">
            {loading ? (
                <List>
                    <ListBookItemSkeleton />
                </List>
            ) : (
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={height}
                            width={width}
                            itemCount={booksToRender.length}
                            itemSize={70}
                        >
                            {renderRow(books, handleShowBookDetail)}
                        </FixedSizeList>
                    )}
                </AutoSizer>
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
