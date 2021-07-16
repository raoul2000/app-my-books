import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { useRecoilValue } from "recoil";
import { booksState } from "../state/books";
import { Book } from "../types";
import useLocation from "wouter/use-location";

type Props = {
    id: string;
};

export const BookDetailsPage: React.FC<Props> = ({ id }): JSX.Element => {
    const books = useRecoilValue<Book[]>(booksState);
    const thisBook = books.find((book) => book.id === id);
    const [, setLocation] = useLocation();

    return (
        <div className="detail-book">
            <IconButton
                aria-label="back"
                size="small"
                onClick={() => setLocation("/")}
            >
                <ArrowBackIosIcon fontSize="small" /> Book list
            </IconButton>

            {thisBook && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {thisBook.title}
                        </Typography>
                        <Typography color="textSecondary"> {thisBook.author}</Typography>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
