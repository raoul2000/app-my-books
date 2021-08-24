import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import { ProgressSpinner } from "@/component/ProgressSpinner";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useSnackbar } from "notistack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation } from "wouter";

import { TopBarActions } from "@/component/app-bar/TopBarActions";
import BookApi from "../api/book";
import { bookByIdState, bookListState } from "../state/book-list";

type Props = {
    bookId: string;
};
export const BoardingPage: React.FC<Props> = ({ bookId }): JSX.Element => {
    const book = useRecoilValue(bookByIdState(bookId));
    const setBook = useSetRecoilState(bookListState);
    const { enqueueSnackbar } = useSnackbar();
    const [, setLocation] = useLocation();
    const [progress, setProgress] = useState<boolean>(false);

    if (!book || !book.ticket) {
        return <div>book not found</div>;
    }

    const handleBoarding = () => {
        if (book?.ticket) {
            setProgress(true);
            BookApi.boardingTicket(book.id, book.ticket)
                .then((updatedTicket) => {
                    setBook((curBookList) =>
                        curBookList.map((oBook) => {
                            if (oBook.id === book.id) {
                                return {
                                    ...oBook,
                                    ticket: updatedTicket,
                                };
                            } else {
                                return oBook;
                            }
                        })
                    );
                    enqueueSnackbar("Embarquement Terminé : Bon voyage !", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                        },
                    });
                    setLocation(`/travel/${book.id}`);
                })
                .catch(console.error);
        }
    };

    return (
        <div>
            <TopBarActions
                title="Embarquement"
                backPath={`/travel/${book.id}`}
            />
            <main>
                <Container maxWidth="sm">
                    {progress ? (
                        <ProgressSpinner message="Fin d'embarquement..." />
                    ) : (
                        <Paper elevation={0}>
                            <List
                                subheader={
                                    <ListSubheader>
                                        Checklist Embarquement
                                    </ListSubheader>
                                }
                            >
                                <ListItem>
                                    <ListItemText
                                        id="switch-qrcode"
                                        primary="Le QR Code du ticket est collé sur la
                                        couverture du livre"
                                    />
                                    <ListItemSecondaryAction>
                                        <Switch edge="end" />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        id="switch-booking-number"
                                        primary="Le numéro de réservation est inscrit sur le livre"
                                    />
                                    <ListItemSecondaryAction>
                                        <Switch edge="end" />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        id="switch-checkpoint"
                                        primary="Le CHECKPOINT est inscrit sur le livre"
                                    />
                                    <ListItemSecondaryAction>
                                        <Switch edge="end" />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleBoarding}
                            >
                                Terminer l'embarquement
                            </Button>
                        </Paper>
                    )}
                </Container>
            </main>
        </div>
    );
};
