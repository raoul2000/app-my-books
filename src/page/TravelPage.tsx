import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { TicketForm } from "@/component/TicketForm";
import { TravelTicket } from "@/types";
import { useRecoilValue } from "recoil";
import { bookByIdState } from "../state/book-list";
import BookApi from "../api/book";
import { useState } from "react";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    ticketContainer: {
        padding: "1em",
    },
}));

type Props = {
    /**
     * The book Id
     */
    id: string;
};

export const TravelPage: React.FC<Props> = ({ id }): JSX.Element => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const book = useRecoilValue(bookByIdState(id));
    const [ticket, setTicket] = useState<TravelTicket | undefined>();
    const [status, setStatus] = useState<
        "loading" | "ticket_form" | "ticket_creating" | "ticket_ready"
    >("loading");

    if (!book) {
        return <div>book not found</div>;
    }
    useEffect(() => {
        if (book) {
            BookApi.readBookTicket(book)
                .then((newTicket) => {
                    console.log(newTicket);
                    setTicket(newTicket);
                    setStatus("ticket_ready");
                })
                .catch((error) => {
                    if (error.status === 404) {
                        setStatus("ticket_form");
                        enqueueSnackbar(
                            "Ticket introuvable : création d'un nouveau ticket",
                            {
                                variant: "info",
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "center",
                                },
                            }
                        );
                    }
                });
        }
    }, []);

    const handleCreateTicket = (ticketInfo: TravelTicket) => {
        console.log(ticketInfo);
        setStatus("ticket_creating");
        BookApi.createBookTicket(id, ticketInfo)
            .then((newTicket) => {
                console.log(newTicket);
                setTicket(newTicket);
                setStatus("ticket_ready");
                enqueueSnackbar("Ticket créé", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const renderContent = () => {
        switch (status) {
            case "loading":
                return (
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                    >
                        <div>Recherche du Ticket...</div>
                        <div>
                            <CircularProgress />
                        </div>
                    </Typography>
                );
            case "ticket_creating":
                return (
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                    >
                        <div>Création du Ticket...</div>
                        <div>
                            <CircularProgress />
                        </div>
                    </Typography>
                );
            case "ticket_form":
                return (
                    <TicketForm
                        book={book}
                        onCreateTicket={handleCreateTicket}
                    />
                );
            case "ticket_ready":
                return (
                    <>
                        <Paper className={classes.ticketContainer}>
                            <Typography color="textSecondary" variant="button">
                                Numéro de Réservation
                            </Typography>
                            <Typography variant="h5" gutterBottom={true}>
                                {ticket?.id}
                            </Typography>
                            <Typography color="textSecondary" variant="button">
                                Checkpoint
                            </Typography>
                            <Typography variant="h5" gutterBottom={true}>
                                https://ping.mariola.fr
                            </Typography>
                        </Paper>
                        <Paper className={classes.ticketContainer}>
                            <Typography color="textSecondary" variant="button">
                                Passager
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom={true}>
                                {book?.title}
                            </Typography>
                            <Typography color="textSecondary" variant="button">
                                Date Départ
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom={true}>
                                12/02/2021 à 12h45
                            </Typography>
                            <Typography color="textSecondary" variant="button">
                                Lieu de Départ
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom={true}>
                                Paris
                            </Typography>
                        </Paper>
                    </>
                );
            default:
                return <div></div>;
        }
    };
    return (
        <div>
            <TopBarActions
                title="Ticket de Voyage"
                backPath={`/detail/${id}`}
            />
            <main>
                <Container maxWidth="sm">{renderContent()}</Container>
            </main>
        </div>
    );
};
