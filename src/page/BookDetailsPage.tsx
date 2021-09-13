import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import { Alert } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import LinearProgress from "@material-ui/core/LinearProgress";
import Badge from "@material-ui/core/Badge";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookListState, bookByIdState } from "@/state/book-list";
import { progressState } from "@/state/progress";
import { Book, getReadStatusLabel } from "@/types";
import { useLocation } from "wouter";
import BookApi from "@/api/book";
import Rating from "@material-ui/lab/Rating";
import { BookDetailBar } from "@/component/app-bar/BookDetailBar";
import { WebShareBookButton } from "@/component/button/WebShareBookButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flex: 1,
            justifyContent: "flex-end",
            color: "white",
            textAlign: "center",
        },
        submitButton: {
            color: "white",
        },
        chipToRead: {
            float: "right",
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: "rotate(180deg)",
        },
    })
);

type Props = {
    id: string;
};

export const BookDetailsPage: React.FC<Props> = ({
    id,
}): JSX.Element | null => {
    const classes = useStyles();
    //const { isSupported, loading, share } = useWebShare();
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
                                            className={classes.chipToRead}
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
                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                            onClick={() =>
                                                handleExpandClick(thisBook)
                                            }
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
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
