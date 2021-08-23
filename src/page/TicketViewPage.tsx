import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import { useSnackbar } from "notistack";
import { useLocation } from "wouter";

import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { TravelTicket } from "@/types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookByIdState, bookListState } from "../state/book-list";
import BookApi from "../api/book";
import { TicketView } from "@/component/TicketView";
import { Boarding } from "@/component/Boarding";
import { TicketHelp } from "@/component/TicketHelp";
import { ProgressSpinner } from "@/component/ProgressSpinner";

const useStyles = makeStyles((theme) => ({
    ticketContainer: {
        padding: "1em",
    },
    createTicketButton: {
        width: "100%",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    boardingButton: {
        marginLeft: "auto",
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    ticketMainInfoContainer: {
        backgroundColor: "#fafafa",
        padding: "1em",
        border: "1px dashed black",
        marginBottom: "2em",
    },
    checklistContainer: {
        padding: "1em",
    },
}));

type Props = {
    /**
     * The book Id
     */
    id: string;
};

export const TicketViewPage: React.FC<Props> = ({ id }): JSX.Element => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const setBook = useSetRecoilState(bookListState);
    const book = useRecoilValue(bookByIdState(id));
    const [ticket, setTicket] = useState<TravelTicket | undefined>();
    const [, setLocation] = useLocation();
    const [status, setStatus] = useState<
        | "loading"
        | "ticket_form"
        | "ticket_not_found"
        | "ticket_creating"
        | "ticket_deleting"
        | "ticket_ready"
        | "pre_boarding"
        | "boarding"
    >("loading");

    if (!book) {
        return <div>book not found</div>;
    }
    useEffect(() => {
        if (!book.isTicketLoaded) {
            BookApi.readBookTicket(book)
                .then((newTicket) => {
                    setBook((old) =>
                        old.map((oBook) => {
                            if (oBook.id === book.id) {
                                return {
                                    ...oBook,
                                    isTicketLoaded: true,
                                    ticket: newTicket,
                                };
                            } else {
                                return oBook;
                            }
                        })
                    );
                    setStatus("ticket_ready");
                })
                .catch((error) => {
                    if (error.status === 404) {
                        setBook((old) =>
                            old.map((oBook) => {
                                if (oBook.id === book.id) {
                                    return {
                                        ...oBook,
                                        isTicketLoaded: true,
                                    };
                                } else {
                                    return oBook;
                                }
                            })
                        );
                        setStatus("ticket_not_found");
                    }
                });
        } else {
            setStatus(book.ticket ? "ticket_ready" : "ticket_not_found");
        }
    }, []);

    const handleDeleteTicket = () => {
        if (book && confirm("Etes-vous sûr de vouloir effacer ce ticket ?")) {
            // TODO: ticket MUST NOT be used
            setStatus("ticket_deleting");
            BookApi.deleteBookTicket(book)
                .then(() => {
                    setBook((old) =>
                        old.map((oBook) => {
                            if (oBook.id === book.id) {
                                return {
                                    ...oBook,
                                    ticket: undefined,
                                };
                            } else {
                                return oBook;
                            }
                        })
                    );
                    enqueueSnackbar("Ticket supprimé", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                        },
                    });
                    setStatus("ticket_not_found");
                })
                .catch(console.error);
        }
    };
    const handleBoarding = () => {
        setStatus("boarding");
        if (ticket) {
            BookApi.boardingTicket(book.id, ticket)
                .then((updatedTicket) => {
                    setTicket(updatedTicket);
                    enqueueSnackbar("Embarquement Terminé : Bon voyage !", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                        },
                    });
                    setStatus("ticket_ready");
                })
                .catch(console.error);
        }
    };

    const renderContent = () => {
        switch (status) {
            case "pre_boarding":
                return <Boarding onConfirm={handleBoarding} />;
            case "boarding":
                return <ProgressSpinner message="Embarquement en cours..." />;
            case "loading":
                return <ProgressSpinner message="Recherche du Ticket..." />;
            case "ticket_deleting":
                return <ProgressSpinner message="Suppression du Ticket ..." />;
            case "ticket_not_found":
                return (
                    <>
                        <Card elevation={0}>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <CloseIcon />
                                    </Avatar>
                                }
                                subheader="Aucun ticket pour ce livre"
                            />
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() =>
                                        setLocation(`/ticket-edit/${book.id}`)
                                    }
                                >
                                    Créer Ticket
                                </Button>
                            </CardActions>
                        </Card>
                        <TicketHelp />
                    </>
                );
            case "ticket_ready":
                return (
                    <>
                        {book.ticket && (
                            <TicketView
                                ticket={book.ticket}
                                book={book}
                                onDeleteTicket={handleDeleteTicket}
                                onBoarding={console.log}
                            />
                        )}
                        <TicketHelp />
                    </>
                );
            default:
                return <div></div>;
        }
    };
    return (
        <div>
            <TopBarActions title="Livre en Voyage" backPath={`/detail/${id}`} />
            <main>
                <Container maxWidth="sm">{renderContent()}</Container>
            </main>
        </div>
    );
};
