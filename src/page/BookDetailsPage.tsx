import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { useRecoilValue } from "recoil";
import { booksState } from "../state/books";
import { Book } from "../types";
import { GoBackButton } from "../component/GoBackButton";

type Props = {
    id: string;
};

export const BookDetailsPage: React.FC<Props> = ({ id }): JSX.Element => {
    const books = useRecoilValue<Book[]>(booksState);
    const thisBook = books.find((book) => book.id === id);

    return (
        <div className="detail-book">
            <GoBackButton to="/" label="Book list" />
            {thisBook && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {thisBook.title}
                        </Typography>
                        <Typography color="textSecondary">
                            {thisBook.author}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
