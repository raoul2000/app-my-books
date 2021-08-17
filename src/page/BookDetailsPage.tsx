import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";

import { useRecoilState, useSetRecoilState } from "recoil";
import { booksState } from "../state/books";
import { progressState } from "../state/progress";
import { Book, getReadStatusLabel } from "../types";
import { useLocation } from "wouter";
import BookApi from "../api/book";
import { TopBarActions } from "@/component/TopBarActions";
import Rating from "@material-ui/lab/Rating";

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
        chipToRead : {
            float:"right"
        }
    })
);

type Props = {
    id: string;
};

export const BookDetailsPage: React.FC<Props> = ({ id }): JSX.Element => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [books, setBooks] = useRecoilState<Book[]>(booksState);
    const setProgress = useSetRecoilState(progressState);
    const [, setLocation] = useLocation();

    const thisBook = books.find((book) => book.id === id);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleDeleteBook = (book?: Book): void => {
        if (!book) return;

        if (confirm(`Delete "${book.title}" ?`)) {
            setProgress(true);
            setLocation("/");
            BookApi.deleteBookById(book.id)
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
            <TopBarActions
                actions={
                    <>
                        <Button
                            className={classes.submitButton}
                            onClick={() => setLocation(`/update/${id}`)}
                        >
                            Modifier
                        </Button>
                        <IconButton
                            aria-label="settings"
                            color="inherit"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => handleDeleteBook(thisBook)}
                            >
                                Supprimer
                            </MenuItem>
                        </Menu>
                    </>
                }
            ></TopBarActions>
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
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        )}
                    </div>
                </Container>
            </main>
        </>
    );
};
{
    /* <Typography color="textSecondary">
{getReadStatusLabel(
    thisBook.readStatus
)}
</Typography> */
}
