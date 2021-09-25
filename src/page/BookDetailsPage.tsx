import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import Alert from "@mui/material/Alert";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LinearProgress from "@mui/material/LinearProgress";
import Badge from "@mui/material/Badge";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookListState, bookByIdState } from "@/state/book-list";
import { progressState } from "@/state/progress";
import { Book, getReadStatusLabel } from "@/types";
import { useLocation } from "wouter";
import BookApi from "@/api/book";
import Rating from "@mui/material/Rating";
import { BookDetailBar } from "@/component/app-bar/BookDetailBar";
import { WebShareBookButton } from "@/component/button/WebShareBookButton";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

type Props = {
    id: string;
};

export const BookDetailsPage: React.FC<Props> = ({
    id,
}): JSX.Element | null => {
    const [, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const thisBook = useRecoilValue(bookByIdState(id));
    const setBooks = useSetRecoilState<Book[]>(bookListState);
    const setProgress = useSetRecoilState(progressState);
    const [, setLocation] = useLocation();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [abstract, setAbstract] = useState<{
        status: "progress" | "error" | "success";
        text?: string;
    }>({ status: "success" });

    if (!thisBook) {
        setLocation("/");
        return null;
    }

    const handleExpandClick = (book: Book) => {
        if (!expanded && abstract.text === undefined && book?.isbn) {
            setAbstract({ status: "progress" });
            BookApi.fetchBookDescriptionByIsbn(book.isbn)
                .then((description) =>
                    setAbstract({
                        status: "success",
                        text: description,
                    })
                )
                .catch((error) => setAbstract({ status: "error" }));
        }
        setExpanded(!expanded);
    };

    const handleTravelClick = (book: Book) => setLocation(`/travel/${book.id}`);
    const handleTrackClick = (book: Book) =>
        setLocation(`/follow-trip/${book.id}`);
    const handleClose = () => setAnchorEl(null);

    const handleDeleteBook = (book?: Book): void => {
        if (!book) return;

        if (confirm(`Delete "${book.title}" ?`)) {
            setProgress(true);
            setLocation("/");
            BookApi.deleteBook(book)
                .then(() => {
                    setBooks((oldBooks) => [
                        ...oldBooks.filter((obook) => obook.id !== book.id),
                    ]);
                })
                .catch(console.error)
                .finally(() => setProgress(false));
        }
        handleClose();
    };

    return (
        <>
            <BookDetailBar
                book={thisBook}
                onClickDeleteBook={handleDeleteBook}
            />
            <main>
                <Container maxWidth="sm">
                    <div className="detail-book">
                        {thisBook && (
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h1">
                                        {thisBook.title}
                                    </Typography>
                                    {thisBook.subtitle && (
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            color="textSecondary"
                                        >
                                            {thisBook.subtitle}
                                        </Typography>
                                    )}
                                    <Typography color="textSecondary">
                                        {thisBook.author}
                                    </Typography>
                                    {thisBook.readStatus && (
                                        <Chip
                                            sx={{ float: "right" }}
                                            size="small"
                                            label={getReadStatusLabel(
                                                thisBook.readStatus
                                            )}
                                        />
                                    )}
                                    <Rating
                                        name="book-rate"
                                        value={thisBook.rate || null}
                                        readOnly={true}
                                    />
                                </CardContent>

                                <CardActions disableSpacing>
                                    <WebShareBookButton book={thisBook} />
                                    <IconButton
                                        aria-label="voyage"
                                        onClick={() =>
                                            handleTravelClick(thisBook)
                                        }
                                    >
                                        <FlightTakeoffIcon />
                                    </IconButton>

                                    {thisBook.isTraveling === true && (
                                        <IconButton
                                            aria-label="follow trip"
                                            onClick={() =>
                                                handleTrackClick(thisBook)
                                            }
                                        >
                                            <Badge
                                                badgeContent={
                                                    thisBook.pingCount
                                                }
                                                color="primary"
                                            >
                                                <PersonPinCircleIcon />
                                            </Badge>
                                        </IconButton>
                                    )}
                                    {thisBook.isbn && (
                                        <ExpandMore
                                            expand={expanded}
                                            onClick={() =>
                                                handleExpandClick(thisBook)
                                            }
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    )}
                                </CardActions>
                                {thisBook.isbn && (
                                    <Collapse
                                        in={expanded}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <CardContent>
                                            {abstract.status === "success" && (
                                                <Typography paragraph>
                                                    {abstract.text}
                                                </Typography>
                                            )}
                                            {abstract.status === "error" && (
                                                <Alert severity="error">
                                                    Résumé indisponible
                                                </Alert>
                                            )}
                                            {abstract.status === "progress" && (
                                                <Typography paragraph>
                                                    Chargement du résumé ...
                                                </Typography>
                                            )}
                                            {abstract.status === "progress" && (
                                                <LinearProgress />
                                            )}
                                        </CardContent>
                                    </Collapse>
                                )}
                            </Card>
                        )}
                    </div>
                </Container>
            </main>
        </>
    );
};
